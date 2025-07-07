import connectDB from "./src/config/db";
import app from "./app";
import { Request, Response } from "express";

const PORT = process.env.PORT || 5000;

connectDB();

app.get("/", (req: Request, res: Response) => {
    res.send("supermarket-backend is running!");
})

app.listen((PORT), () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

