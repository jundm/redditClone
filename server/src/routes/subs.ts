import {Router, Request, Response} from "express";
import jwt from "jsonwebtoken";
import User from "@entities/User";

const createSubs = async (req: Request, res: Response, next: any) => {
    const {name, title, description} = req.body;

    const token = req.cookies.token;
    if(!token) return next();

    // @ts-ignore
    const {username} = jwt.verify(token, process.env.JWT_SECRET as string);

    // @ts-ignore
    const user = await User.findOne({username});

    if(!user) throw new Error
};

const router = Router();

router.post("/", createSubs);

export default router;