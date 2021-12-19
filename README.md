# @aminnairi/i3status

[![NPM badge](https://badgen.net/npm/v/@babel/core)](https://www.npmjs.com/package/@aminnairi/i3status) [![Bundle size](https://badgen.net/bundlephobia/minzip/@aminnairi/i3status)](https://bundlephobia.com/package/@aminnairi/i3status) ![Vulnerabilities count](https://badgen.net/snyk/aminnairi/i3status)

Library to create your own i3 status bar in Node.js using the Flux architecture

![Status Bar](https://user-images.githubusercontent.com/18418459/146653832-246fe8e9-b680-47ac-8c90-6fe7fbf1a121.png)


## Requirements

- [JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript)
- [GNU/Linux](https://en.wikipedia.org/wiki/Linux)
- [Terminal emulator](https://en.wikipedia.org/wiki/Terminal_emulator)
- [Text editor](https://en.wikipedia.org/wiki/Text_editor)
- [Node](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [i3wm](https://i3wm.org/)

## Installation

Open a new terminal emulator and type the following commands.

```bash
mkdir ~/my-i3status
cd ~/my-i3status
touch index.mjs
npm install --save-exact --save @aminnairi/i3status
```

Open the created file `index.mjs` and copy/paste the following block of code into it.

```javascript
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
```

Open the file `~/.config/i3/config` and replace the following option `status_command` if it already exists, or add it to the `bar` block.

```
bar {
  status_command node ~/my-i3status/index.mjs
}
```

In the same terminal emulator you just opened, type the following command.

```bash
i3-msg reload
```

## Examples

See [`examples`](https://github.com/aminnairi/i3status/tree/production/examples).

## Contributing

See [`CONTRIBUTING.md`](https://github.com/aminnairi/i3status/tree/production/CONTRIBUTING.md).

## Code of conduct

See [`CODE_OF_CONDUCT.md`](https://github.com/aminnairi/i3status/tree/production/CODE_OF_CONDUCT.md).

## License

See [`LICENSE`](https://github.com/aminnairi/i3status/tree/production/LICENSE).
