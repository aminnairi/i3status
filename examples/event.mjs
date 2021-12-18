import {createInterface} from "readline/promises";
import {stdin as input} from "process";
import {createRenderer} from "@aminnairi/i3status";

const render = createRenderer({
  createInterface,
  input
});

const getTime = () => {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

const dispatch = render({
  initialBlocks: [
    {
      name: "username",
      full_text: "johndoe"
    },
    {
      name: "clock",
      full_text: getTime()
    }
  ],
  onEvent: ({event: {name, button}, dispatch}) => {
    if (name === "username" && button === 1) {
      dispatch({
        name: "USERNAME_TOGGLE_FULL_TEXT"
      });
    }
  },
  onDispatch: ({blocks, action: {name, payload}}) => {
    switch (name) {
      case "USERNAME_TOGGLE_FULL_TEXT":
        return blocks.map(block => {
          if (block.name !== "username") {
            return block;
          }

          if (block.full_text === "johndoe") {
            return {
              ...block,
              full_text: "doejohn"
            };
          }

          return {
            ...block,
            full_text: "johndoe"
          };
        });

      case "CLOCK_SET_FULL_TEXT":
        return blocks.map(block => {
          if (block.name !== "clock") {
            return block;
          }

          return {
            ...block,
            full_text: payload
          };
        })

      default:
        return blocks;
    }
  }
});

setInterval(() => {
  dispatch({
    name: "CLOCK_SET_FULL_TEXT",
    payload: getTime()
  });
}, 1000 * 5);
