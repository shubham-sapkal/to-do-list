import express from 'express';
export const app = express();

import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';

import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorMiddlware } from './middlewares/error.js';

import cors from "cors";

config({
    path: './data/config.env'
})

//middlwares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// using user define routes 
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

// Default Route
app.get("/", (req, res) => {
    res.send("Nice Working ... ");
} );

// Error Handling Middleware
app.use( errorMiddlware );