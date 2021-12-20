// Create a value that can be observed through its different mutations
const createObservable = (initialValue) => {
  // State of the observable
  const data = {
    // Value of the observable
    value: initialValue,
    // Observers notified when the value is changed
    observers: []
  };

  return {
    // Add a new subscriber that will be notified of any changes
    observe: (newObserver) => {
      // Add the subscriber to the list of observers
      data.observers.push(newObserver);
    },

    // Update the value based on the previous one
    next: (update) => {
      // Update the value
      data.value = update(data.value);

      // For each subscriber of this observable data
      data.observers.forEach(notify => {
        // Notify the subscriber
        notify(data.value);
      });
    },

    // Send a value, regardless of the value it has before
    emit: (newValue) => {
      // Update the value
      data.value = newValue;

      // For each subscriber of this observable data
      data.observers.forEach(notify => {
        // Notify the subscriber
        notify(newValue);
      });
    }
  };
};

// Helper for working with an infinite stream of lines
const onLine = (readlineInterface, callback) => {
  // Each time there is a line comming from the standard input
  readlineInterface.question("").then(line => {
    // What to do when the i3bar protocol sends an event (see below in the createRenderer function)
    callback(line);
    // Recursively call this function (and hope for not reaching the stack size limit until TCO is adopted by Node)
    onLine(readlineInterface, callback);
  });
};

// Helper for parsing i3bar JSON values
const parseNdjson = async (text) => JSON.parse(text.slice(1));

// Create the renderer for futur i3bar status renders
export const createRenderer = ({createInterface, input, output}) => {
  // Create the render function to be called by the userland
  return ({initialBlocks, onDispatch, onEvent}) => {
    // Create an observable with the blocks to render
    const observableBlocks = createObservable([]);

    // Create the interface for listening for standard inputs
    const readlineInterface = createInterface({
      input
    });

    // Send the header block to the i3wm renderer
    output.write(JSON.stringify({version: 1, click_events: true}));
    // Start the begining of the NDJSON
    output.write("[");

    // Observe any change in the blocks
    observableBlocks.observe(blocks => {
      // Each time the blocks are changed through a dispatch, send the new block to the i3wm renderer
      output.write(JSON.stringify(blocks) + ",");
    });

    // Create the dispatch function for the userland
    const dispatch = ({name, payload}) => {
      // Each time it is called, send a new value for the blocks
      observableBlocks.next(blocks => {
        // Compute the next value of the block based on the userland's reducer callback
        return onDispatch({
          // With the previous blocks
          blocks,
          // With the event
          action: {
            // With the name of the action
            name,
            // With the payload associated to the action
            payload
          }
        });
      });
    };

    // Each time there is a click event comming from the i3 input protocol
    onLine(readlineInterface, line => {
      // Parse the Newline-delimited JSON string
      parseNdjson(line.trim()).then(event => {
        // Call the userland's onEvent callback
        onEvent({
          // With the parsed event properties
          event,
          // With the dispatch function
          dispatch
        });
      }).catch(() => {});
    });

    // Send the initial blocks for the i3wm to render
    observableBlocks.emit(initialBlocks);

    // Return the dispatch function to the userland
    return dispatch;
  };
};
