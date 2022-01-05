import path from "path";
import { Command } from "commander";
import { serve } from "local-api";

export const serveCommand = new Command()
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "Port to run server on", "4007")
    .action((filename = "notebook.js", options: { port:string }) => {
        // console.log({ filename, options });
        const dir = path.join(process.cwd(), path.dirname(filename));
        // console.log("ABSOLUTE PATH:", dir);
        // console.log("Extracted FILENAME", path.basename(filename));
        serve(parseInt(options.port), path.basename(filename), dir);
    });