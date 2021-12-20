# @aminnairi/i3status

[![NPM badge](https://badgen.net/badge/npm/1.0.1/blue)](https://www.npmjs.com/package/@aminnairi/i3status/v/1.0.1) [![Bundle size](https://badgen.net/bundlephobia/minzip/@aminnairi/i3status@1.0.1)](https://bundlephobia.com/package/@aminnairi/i3status@1.0.1) [![Tree shaking support](https://badgen.net/bundlephobia/tree-shaking/@aminnairi/i3status@1.0.1)](https://bundlephobia.com/package/@aminnairi/i3status@1.0.1) ![Vulnerabilities count](https://badgen.net/snyk/aminnairi/i3status)

Library to create your own i3 status bar in Node.js using the Flux architecture

![Status Bar](https://user-images.githubusercontent.com/18418459/146653832-246fe8e9-b680-47ac-8c90-6fe7fbf1a121.png)

## Why

- Because it is inspired by The Elm Architecture, Redux, and the Flux architecture.
- Because it is written using modern ECMAScript syntax.
- Because it is written using modern ECMAScript Modules.
- Because it is written with functional programming in mind.
- Because it is well documented with many examples (and many to come).
- Because it is tested from integration to end-to-end.
- Because it is powered by the Node.js platform and all of its operating system's API and ecosystem.
- Because it allows you to build complex, dynamic status bars with ease.
- Because it does not require any global installation needed (but you can if you want).
- Because it does not require any yaml, env files, and is just plain JavaScript, nothing else.
- Because it has full support for asynchronous updates through dispatches.
- Because it has full support for i3wm click events (buttons, modfiiers, coordinates, ...).
- Because it has full supports for i3wm blocks configuration (color, padding, separator, ...).
- Because it has no external dependencies.
- Because it has been made with love.

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
import {stdin as input, stdout as output} from "process";
import {createRenderer} from "@aminnairi/i3status";

const render = createRenderer({
  createInterface,
  input,
  output
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

## Changelog

See [`CHANGELOG.md`](https://github.com/aminnairi/i3status/tree/production/CHANGELOG.md).

## Contributing

See [`CONTRIBUTING.md`](https://github.com/aminnairi/i3status/tree/production/CONTRIBUTING.md).

## Code of conduct

See [`CODE_OF_CONDUCT.md`](https://github.com/aminnairi/i3status/tree/production/CODE_OF_CONDUCT.md).

## License

See [`LICENSE`](https://github.com/aminnairi/i3status/tree/production/LICENSE).
