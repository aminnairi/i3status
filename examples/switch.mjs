import {userInfo} from "os";
import {createInterface} from "readline/promises";
import {stdin as input, stdout as output} from "process";
import {createRenderer} from "../index.mjs";

const getDate = () => new Date().toLocaleDateString("en-US");
const getTime = () => new Date().toLocaleTimeString("en-US");
const getUsername = () => userInfo().username;

const render = createRenderer({
  createInterface,
  input,
  output
});

const dispatch = render({
  initialBlocks: [
    {
      state: "date",
      name: "datetime",
      full_text: getDate()
    },
    {
      name: "username",
      full_text: getUsername()
    }
  ],
  onEvent: ({event: {name, button, modifiers}, dispatch}) => {
    if (name === "datetime" && button === 1 && modifiers.length === 0) {
      dispatch({
        name: "TOGGLE_DATETIME_STATE",
        payload: ""
      });
    }
  },
  onDispatch: ({blocks, action: {name, payload}}) => {
    switch (name) {
      case "DATETIME_SET_FULL_TEXT":
        return blocks.map(block => {
          if (block.name !== "datetime") {
            return block;
          }

          if (block.state === "date") {
            return {
              ...block,
              full_text: getDate()
            };
          }

          return {
            ...block,
            full_text: getTime()
          };
        });

      case "TOGGLE_DATETIME_STATE":
        return blocks.map(block => {
          if (block.name !== "datetime") {
            return block;
          }

          if (block.state === "date") {
            return {
              ...block,
              full_text: getTime(),
              state: "time"
            };
          }

          return {
            ...block,
            full_text: getDate(),
            state: "date"
          };
        });

      default:
        return blocks;
    }
  }
});

setInterval(() => {
  dispatch({
    name: "DATETIME_SET_FULL_TEXT",
    payload: null
  });
}, 1000);
