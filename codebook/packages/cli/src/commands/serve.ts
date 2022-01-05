import path from "path";
import { Command } from "commander";
import { serve } from "local-api";

export const serveCommand = new Command()
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "Port to run server on", "4007")
    .action(async (filename = "notebook.js", options: { port:string }) => {
        // console.log({ filename, options });
        try {
            const dir = path.join(process.cwd(), path.dirname(filename));
            // console.log("ABSOLUTE PATH:", dir);
            // console.log("Extracted FILENAME", path.basename(filename));
            await serve(parseInt(options.port), path.basename(filename), dir);
            console.log(`Server running successfully with ${filename} at http://localhost:${options.port}.`)
        } catch (error: any) {

            if(error.code === "EADDRINUSE"){
                console.log("Port is already in use - try running on a different port!");
            } else{
                console.log("Error!: ", error.message);
            }

            //force exit if run into some error
            process.exit(1);
        }

    });