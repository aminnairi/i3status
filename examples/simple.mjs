import {createInterface} from "readline/promises";
import {stdin as input} from "process";
import {createRenderer} from "../index.mjs";

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
