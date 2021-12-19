import {createInterface} from "readline/promises";
import {stdin as input, stdout as output} from "process";
import {createRenderer} from "@aminnairi/i3status";

const render = createRenderer({
  createInterface,
  input,
  output
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
      /** @see https://i3wm.org/docs/i3bar-protocol.html#_blocks_in_detail */
      name: "username",
      full_text: "johndoe"
    },
    {
      /** @see https://i3wm.org/docs/i3bar-protocol.html#_blocks_in_detail */
      name: "clock",
      full_text: getTime()
    }
  ],
  /** @see https://i3wm.org/docs/i3bar-protocol.html#_click_events */
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
