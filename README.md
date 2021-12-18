# @aminnairi/i3status

i3wm status bar written in Node.js using the Flux architecture.

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

See [`examples`](./examples).

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Code of conduct

See [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).

## License

See [`LICENSE`](./LICENSE).
