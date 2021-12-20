import {createInterface} from "readline/promises";
import {stdin as input, stdout as output} from "process";
import {userInfo} from "os";
import {createRenderer} from "@aminnairi/i3status";

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
      /** @see https://i3wm.org/docs/i3bar-protocol.html#_blocks_in_detail */
      name: "clock",
      full_text: getTime()
    },
    {
      /** @see https://i3wm.org/docs/i3bar-protocol.html#_blocks_in_detail */
      name: "username",
      full_text: getUsername()
    }
  ],
  onDispatch: ({blocks, action: {name, payload}}) => {
    switch (name) {
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
}, 1000);
