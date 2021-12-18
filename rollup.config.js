import {resolve} from "path";
import {terser} from "rollup-plugin-terser";

export default {
  input: resolve("index.mjs"),
  plugins: [
    terser()
  ],
  output: {
    file: resolve("build", "index.mjs"),
    format: "esm"
  }
}
