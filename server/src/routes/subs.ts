import {Router, Request, Response} from "express";
import jwt from "jsonwebtoken";
import User from "@entities/User";
import userMiddleware from "@middlewares/user";
import authMiddleware from "@middlewares/auth";

const createSubs = async (req: Request, res: Response, next: any) => {
    const {name, title, description} = req.body;


};

const router = Router();

router.post("/", userMiddleware, createSubs);

export default router;