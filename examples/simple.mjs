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
      full_text: "Hello, world!"
    }
  ]
});
