import {createInterface} from "readline/promises";
import {stdin as input} from "process";
import {createRenderer} from "@aminnairi/i3status";

const render = createRenderer({
  createInterface,
  input
});

render({
  initialBlocks: [
    {
      /** @see https://i3wm.org/docs/i3bar-protocol.html#_blocks_in_detail */
      full_text: "Hello, world!"
    }
  ]
});
