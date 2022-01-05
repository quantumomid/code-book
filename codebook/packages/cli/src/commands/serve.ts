import { Command } from "commander";
import { serve } from "local-api";

export const serveCommand = new Command()
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "Port to run server on", "4007")
    .action((filename = "notebook.js", options: { port:string }) => {
        // console.log({ filename, options });
        serve(parseInt(options.port), filename, "/");
    });