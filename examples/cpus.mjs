import {cpus} from "os";
import {createInterface} from "readline/promises";
import {stdin as input, stdout as output} from "process";
import {createRenderer} from "@aminnairi/i3status";

// HELPERS

const getCpus = () => {
  const allCpus = cpus();
  const count = allCpus.length;
  const speed = Math.round(allCpus.reduce((clock, cpu) => clock + cpu.speed, 0) / count) / 1000;

  return `${count} CPUs ${speed}GHz`;
};

// SETUP

const render = createRenderer({
  createInterface,
  input,
  output
});

const dispatch = render({
  initialBlocks: [
    {
      /** @see https://i3wm.org/docs/i3bar-protocol.html#_blocks_in_detail */
      name: "cpus",
      full_text: getCpus()
    }
  ],
  onDispatch: ({blocks, action: {name, payload}}) => {
    switch (name) {
      case "CPUS_SET_FULL_TEXT":
        return blocks.map(block => {
          if (block.name !== "cpus") {
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
    name: "CPUS_SET_FULL_TEXT",
    payload: getCpus()
  });
}, 1000);
