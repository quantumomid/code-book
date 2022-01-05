import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

export const serve = (port:number, filename:string, dir:string) => {
    // console.log({
    //     serving_traffic_on_port: port,
    //     saving_cells_from: filename,
    //     that_file_is_in_dir: dir
    // });

    const app = express();

    app.use(createProxyMiddleware({
        target: "http://localhost:3000",
        ws: true,
        logLevel: "silent",
    }))

    // Add custom promise to allow the express server to work with the async-await syntax
    return new Promise<void>((resolve, reject) => {
        app.listen(port, resolve).on("error", reject);
    })
};