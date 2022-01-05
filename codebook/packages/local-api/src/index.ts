export const serve = (port:number, filename:string, dir:string) => {
    console.log({
        serving_traffic_on_port: port,
        saving_cells_from: filename,
        that_file_is_in_dir: dir
    });
};