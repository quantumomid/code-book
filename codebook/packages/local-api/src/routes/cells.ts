import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
    id: string;
    content: string;
    type: "text" | "code";
}

export const createCellsRouter = (filename: string, dir: string) => {
    const router = express.Router();
    // Body parsing middleware:
    router.use(express.json());

    const fullPath = path.join(dir, filename);

    router.get("/cells", async (request, response) => {
    
        try {
            // Read the file 
            const result = await fs.readFile(fullPath, { encoding: "utf-8" });
            response.send(JSON.parse(result));

        } catch (error: any) {
            // If error thrown then check if file exists
            if(error.code === "ENOENT") {
                // If does not exist then add a default list of cells 
                await fs.writeFile(fullPath, "[]", "utf-8");
                response.send([]);
            } else {
                throw error;
            }
        }


        // Parse a list of cells out of it 
    
        // Send list of cells back to the browser 
    
    });
    
    router.post("/cells", async (request, response) => {
    
        // Make sure the file exists - If not, create it
        // DONE automatically by fs
    
        // Take the list of cells from the request object
        // Serialise them
        const { cells }: { cells: Cell[] } = request.body;

        // Write the cells into the file
        await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

        response.send({ status: "ok" });
    });

    return router;
}