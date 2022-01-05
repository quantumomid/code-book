import express from "express";

export const serve = (port:number, filename:string, dir:string) => {
    // console.log({
    //     serving_traffic_on_port: port,
    //     saving_cells_from: filename,
    //     that_file_is_in_dir: dir
    // });

    const app = express();
    app.listen(port, () => {
        console.log("Listening on port: ", port);
    });
};