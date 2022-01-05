import express from "express";

export const serve = (port:number, filename:string, dir:string) => {
    // console.log({
    //     serving_traffic_on_port: port,
    //     saving_cells_from: filename,
    //     that_file_is_in_dir: dir
    // });

    const app = express();

    // Add custom promise to allow the express server to work with the async-await syntax
    return new Promise<void>((resolve, reject) => {
        app.listen(port, resolve).on("error", reject);
    })
};