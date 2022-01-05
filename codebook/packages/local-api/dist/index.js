"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const serve = (port, filename, dir) => {
    console.log({
        serving_traffic_on_port: port,
        saving_cells_from: filename,
        that_file_is_in_dir: dir
    });
};
exports.serve = serve;
