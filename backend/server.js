import express from "express";

const app = express();

// parse JSON bodies
app.use(express.json());

export default app;
