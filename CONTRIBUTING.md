# Contributing

## Requirements

- [JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript)
- [GNU/Linux](https://en.wikipedia.org/wiki/Linux)
- [Terminal emulator](https://en.wikipedia.org/wiki/Terminal_emulator)
- [Text editor](https://en.wikipedia.org/wiki/Text_editor)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [i3wm](https://i3wm.org/)

## Installation

```bash
git clone https://github.com/aminnairi/i3status ~/i3status
cd ~/i3status
```

## Dependencies installation

This will install dependencies in the `node_modules` folder based on the [`package.json`](https://github.com/aminnairi/i3status/tree/production/package.json) file.

```bash
docker-compose run --rm npm install
```

## Test

This will check if the integration tests are passing.

```bash
docker-compose run --rm npm test
```

## Build

This will build the optimized files in the `build` folder.

```bash
docker-compose run --rm npm run build
```
