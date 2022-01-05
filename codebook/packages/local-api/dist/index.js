"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const serve = (port, filename, dir) => {
    // console.log({
    //     serving_traffic_on_port: port,
    //     saving_cells_from: filename,
    //     that_file_is_in_dir: dir
    // });
    const app = (0, express_1.default)();
    // Add custom promise to allow the express server to work with the async-await syntax
    return new Promise((resolve, reject) => {
        app.listen(port, resolve).on("error", reject);
    });
};
exports.serve = serve;
