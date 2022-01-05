"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const local_api_1 = require("local-api");
exports.serveCommand = new commander_1.Command()
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "Port to run server on", "4007")
    .action((filename = "notebook.js", options) => {
    // console.log({ filename, options });
    const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
    // console.log("ABSOLUTE PATH:", dir);
    // console.log("Extracted FILENAME", path.basename(filename));
    (0, local_api_1.serve)(parseInt(options.port), path_1.default.basename(filename), dir);
});
