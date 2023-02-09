import {Router, Request, Response} from "express";
import userMiddleware from "@middlewares/user";
import authMiddleware from "@middlewares/auth";
import {isEmpty} from "class-validator";

const createSubs = async (req: Request, res: Response, next: any) => {
    const {name, title, description} = req.body;

    try {
        let errors: any = {};
        if(isEmpty(name)) errors.name = "이름은 비워둘 수 없습니다."
        if(isEmpty(title)) errors.title = "제목은 비워둘 수 없습니다."
    } catch (error) {

    }

};

const router = Router();

router.post("/", userMiddleware, authMiddleware, createSubs);

export default router;