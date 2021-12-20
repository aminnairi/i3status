// Allow resolving paths without knowing the operating system's separator
import {resolve} from "path";

// Reduce the size of a script by operating several optimizations
import {terser} from "rollup-plugin-terser";

export default {
  // The file to transform
  input: resolve("index.mjs"),

  // A list of all plugins to apply to the input
  plugins: [
    // Attempt at optimizing the size of the bundle
    terser()
  ],

  // The output file configuration
  output: {
    // The path of the optimized library file
    file: resolve("build", "index.mjs"),
    // The format of the library, here "esm" for ECMAScript Modules
    format: "esm"
  }
}
