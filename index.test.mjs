import {EventEmitter} from "events";
import {describe, it} from "mocha";
import {expect} from "chai";
import {fake} from "sinon";
import {createRenderer} from "./index.mjs";

describe("integration", () => {
  describe("static", () => {
    it("should display the expected status bar", () => {
      const createInterface = ({output}) => {
        return {
          question: () => {
            return new Promise((resolve, reject) => {
              resolve();
            });
          }
        };
      };

      const input = {};

      const output = {
        write: fake()
      };

      const render = createRenderer({
        createInterface,
        input,
        output
      });

      const initialBlocks = [
        {
          full_text: "Hello, world!"
        }
      ];

      render({
        initialBlocks
      });

      expect(output.write.calledWith(JSON.stringify({version: 1, click_events: true}))).to.be.true;
      expect(output.write.calledWith('[')).to.be.true;
      expect(output.write.calledWith(JSON.stringify(initialBlocks) + ",")).to.be.true;
    });
  });

  describe("dispatch", () => {
    it("should display the expected status bar after a dispatch", () => {
      const createInterface = () => {
        return {
          question: () => {
            return new Promise((resolve, reject) => {
              resolve();
            });
          }
        };
      };

      const input = {};

      const output = {
        write: fake()
      };

      const render = createRenderer({
        createInterface,
        input,
        output
      });

      const initialBlocks = [
        {
          name: "clock",
          full_text: "01/02/2021 01:02:03"
        },
        {
          name: "message",
          full_text: "Hello, world!"
        }
      ];

      const onDispatch = ({blocks, action: {name, payload}}) => {
        switch (name) {
          case "MESSAGE_SET_FULL_TEXT":
            return blocks.map(block => {
              if (block.name !== "message") {
                return block;
              }

              return {
                ...block,
                full_text: payload
              };
            });
        }
      };

      const dispatch = render({
        initialBlocks,
        onDispatch
      });

      dispatch({
        name: "MESSAGE_SET_FULL_TEXT",
        payload: "Bye, world!"
      });

      const expectedBlocks = [
        {
          name: "clock",
          full_text: "01/02/2021 01:02:03"
        },
        {
          name: "message",
          full_text: "Bye, world!"
        }
      ];

      expect(output.write.calledWith(JSON.stringify({version: 1, click_event: true})));
      expect(output.write.calledWith("["));
      expect(output.write.calledWith(JSON.stringify(initialBlocks) + ","));
      expect(output.write.calledWith(JSON.stringify(expectedBlocks) + ",")).to.be.true;
    });
  });

  describe("event", () => {
    it("should display the expected status bar after an event", () => {
      const eventEmitter = new EventEmitter();

      const createInterface = () => {
        return {
          question: () => {
            return new Promise((resolve) => {
              eventEmitter.on("line", line => {
                resolve(line);
              });
            });
          }
        };
      };

      const input = {};

      const output = {
        write: fake()
      };

      const render = createRenderer({
        createInterface,
        input,
        output
      });

      const initialBlocks = [
        {
          name: "clock",
          full_text: "01/02/2021 01:02:03"
        },
        {
          name: "message",
          full_text: "Hello, world!"
        }
      ];

      const onEvent = ({event: {name, button, modifiers}, dispatch}) => {
        if (name === "message" && button === 1 && modifiers.length === 0) {
          dispatch({
            name: "MESSAGE_SET_FULL_TEXT",
            payload: "Clicked"
          });
        }
      };

      const onDispatch = ({blocks, action: {name, payload}}) => {
        switch (name) {
          case "MESSAGE_SET_FULL_TEXT":
            return blocks.map(block => {
              if (block.name !== "message") {
                return block;
              }

              return {
                ...block,
                full_text: payload
              };
            });

          default:
            return blocks;
        }
      };

      render({
        initialBlocks,
        onDispatch,
        onEvent
      });

      expect(output.write.calledWith(JSON.stringify({version: 1, click_event: true})));
      expect(output.write.calledWith("["));
      expect(output.write.calledWith(JSON.stringify(initialBlocks) + ","));

      const expectedBlocks = [
        {
          name: "clock",
          full_text: "01/02/2021 01:02:03"
        },
        {
          name: "message",
          full_text: "Clicked"
        }
      ];

      eventEmitter.emit("line", "," + JSON.stringify({name: "message", button: 1, modifiers: []}));

      setTimeout(() => {
        expect(output.write.calledWith(JSON.stringify(expectedBlocks) + ",")).to.be.true;
      }, 1);
    });
  });
});
