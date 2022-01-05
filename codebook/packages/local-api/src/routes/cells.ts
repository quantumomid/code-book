import express from "express";

export const createCellsRouter = (filename: string, dir: string) => {
    const router = express.Router();

    router.get("/cells", async (request, response) => {
    
        // Check if cell storage file exists 
        // If does not exist then add a default list of cells 
    
    
        // Read the file 
    
        // Parse a list of cells out of it 
    
        // Send list of cells back to the browser 
    
    });
    
    router.post("/cells", async (request, response) => {
    
        // Make sure the file exists 
        // If not, create it
    
        // Take the list of cells from the request object
    
        // Serialise them
    
        // Write the cells into the file
    
    });

    return router;
}