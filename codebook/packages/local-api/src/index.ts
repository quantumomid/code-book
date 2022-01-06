import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { createCellsRouter } from "./routes/cells";

export const serve = (port:number, filename:string, dir:string, useProxy:boolean) => {
    // console.log({
    //     serving_traffic_on_port: port,
    //     saving_cells_from: filename,
    //     that_file_is_in_dir: dir
    // });

    
    const app = express();

    app.use(createCellsRouter(filename, dir));

    if(useProxy) {
        app.use(createProxyMiddleware({
            target: "http://localhost:3000",
            ws: true,
            logLevel: "silent",
        }))
    } else {
        const packagePath = require.resolve("@codebookjs/local-client/build/index.html");
        // Static middleware to give local API access to the React files
        app.use(express.static(path.dirname(packagePath)));
    }

    // Add custom promise to allow the express server to work with the async-await syntax
    return new Promise<void>((resolve, reject) => {
        app.listen(port, resolve).on("error", reject);
    })
};