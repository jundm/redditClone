import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import express from "express";
import morgan from "morgan";
import {AppDataSource} from "@data-source";
import authRoutes from '@routes/auth';
import subRoutes from '@routes/subs';

dotenv.config();
const app = express();
let PORT = 4000;
const origin = "http://localhost:3000";

app.use(cors({
    origin,
    credentials: true,
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public"));
app.use('/api/auth', authRoutes);
app.use('/api/subs', subRoutes);

app.get("/", (_, res) => res.send("running"));

app.listen(PORT, async () => {
    console.log(`
    ###########################################
    Server running at http://localhost:${PORT}
    and http://127.0.0.1:${PORT}
    ###########################################
    `);
    AppDataSource.initialize().then(async () => {
        console.log("database initialized!");
    }).catch(error => console.log(error));

});