#!/usr/bin/env node
import express from "express";

const app = express();

app.get("/", (request, response) => {
    response.send("Hi There!");
});

app.listen(3005, () => {
    console.log("Listening on 3005");
});