"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    .action((filename = "notebook.js", options) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log({ filename, options });
    try {
        const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
        // console.log("ABSOLUTE PATH:", dir);
        // console.log("Extracted FILENAME", path.basename(filename));
        yield (0, local_api_1.serve)(parseInt(options.port), path_1.default.basename(filename), dir);
        console.log(`Server running successfully with ${filename} at http://localhost:${options.port}.`);
    }
    catch (error) {
        if (error.code === "EADDRINUSE") {
            console.log("Port is already in use - try running on a different port!");
        }
        else {
            console.log("Error!: ", error.message);
        }
        //force exit if run into some error
        process.exit(1);
    }
}));
