const createObservable = (initialValue) => {
  const data = {
    value: initialValue,
    observers: []
  };

  return {
    observe: (newObserver) => {
      data.observers.push(newObserver);
    },

    next: (update) => {
      data.value = update(data.value);

      data.observers.forEach(notify => {
        notify(data.value);
      });
    },

    emit: (newValue) => {
      data.value = newValue;

      data.observers.forEach(notify => {
        notify(newValue);
      });
    }
  };
};

const onLine = (readlineInterface, callback) => {
  readlineInterface.question("").then(line => {
    return callback(line);
  }).finally(() => {
    onLine(readlineInterface, callback);
  });
};

const parseNdjson = async (text) => JSON.parse(text.slice(1));

export const createRenderer = ({createInterface, input, output}) => {
  return ({initialBlocks, onDispatch, onEvent}) => {
    const observableBlocks = createObservable([]);

    const readlineInterface = createInterface({
      input,
      output
    });

    readlineInterface.write(JSON.stringify({version: 1, click_events: true}) + "\n");
    readlineInterface.write("[\n");

    observableBlocks.observe(blocks => {
      readlineInterface.write(JSON.stringify(blocks) + ",\n");
    });

    const dispatch = ({name, payload}) => {
      observableBlocks.next(blocks => {
        return onDispatch({blocks, action: {name, payload}});
      });
    };

    onLine(readlineInterface, line => {
      parseNdjson(line.trim()).then(event => {
        onEvent({event, dispatch});
      }).catch(() => {});
    });

    observableBlocks.emit(initialBlocks);

    return dispatch;
  };
};
