import {createInterface} from "readline/promises";
import {stdin as input, stdout as output} from "process";
import {userInfo} from "os";
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

const getUsername = () => {
  const userInformations = userInfo();

  if (!Object.prototype.hasOwnProperty.call(userInformations, "username")) {
    return "unknown";
  }

  const {username} = userInformations;

  if (typeof username !== "string") {
    return "unknown";
  }

  return username;
};

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
