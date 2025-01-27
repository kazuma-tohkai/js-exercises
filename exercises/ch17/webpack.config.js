import path from "path";
const __dirname = import.meta.dirname;
const entry = "./ex05/src/index.js";

const output = {
  filename: "main.js",
  path: path.resolve(__dirname, "ex05/dist/development"),
  // path: path.resolve(__dirname, "ex05/dist/production"),
};
const mode = "development";
// const mode = "production";

const devtool = "source-map";

export default { entry, output, mode, devtool };
