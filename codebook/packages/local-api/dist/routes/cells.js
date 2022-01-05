"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCellsRouter = void 0;
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const createCellsRouter = (filename, dir) => {
    const router = express_1.default.Router();
    // Body parsing middleware:
    router.use(express_1.default.json());
    const fullPath = path_1.default.join(dir, filename);
    router.get("/cells", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Read the file 
            const result = yield promises_1.default.readFile(fullPath, { encoding: "utf-8" });
            response.send(JSON.parse(result));
        }
        catch (error) {
            // If error thrown then check if file exists
            if (error.code === "ENOENT") {
                // If does not exist then add a default list of cells 
                yield promises_1.default.writeFile(fullPath, "[]", "utf-8");
                response.send([]);
            }
            else {
                throw error;
            }
        }
        // Parse a list of cells out of it 
        // Send list of cells back to the browser 
    }));
    router.post("/cells", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        // Make sure the file exists - If not, create it
        // DONE automatically by fs
        // Take the list of cells from the request object
        // Serialise them
        const { cells } = request.body;
        // Write the cells into the file
        yield promises_1.default.writeFile(fullPath, JSON.stringify(cells), "utf-8");
        response.send({ status: "ok" });
    }));
    return router;
};
exports.createCellsRouter = createCellsRouter;
