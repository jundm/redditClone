import {Router, Request, Response} from "express";
import {isEmpty} from "class-validator";
import userMiddleware from "@middlewares/user";
import authMiddleware from "@middlewares/auth";
import Sub from "@entities/Sub";
import {AppDataSource} from "@data-source";
import User from "@entities/User";
import Post from "@entities/Post";

const createSubs = async (req: Request, res: Response, next: any) => {
    const {name, title, description} = req.body;

    try {
        let errors: any = {};
        if (isEmpty(name)) errors.name = "이름은 비워둘 수 없습니다.";
        if (isEmpty(title)) errors.title = "제목은 비워둘 수 없습니다.";

        const sub = await AppDataSource.getRepository(Sub)
            .createQueryBuilder("sub")
            .where("lower(sub.name = :name", {name: name.toLowerCase()})
            .getOne();

        if (sub) errors.name = "서브사 이미 존재합니다.";
        if (Object.keys(errors).length > 0) {
            throw errors;
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "문제가 발생했습니다."});
    }

    try {
        const user: User = res.locals.user;
        const sub = new Sub();
        sub.name = name;
        sub.description = description;
        sub.title = title;
        sub.user = user;
        await sub.save();
        return res.json(sub);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "문제가 발생했습니다."});
    }

};

const topSubs = async (req: Request, res: Response) => {
    try {
        const imageUrlExp = `COALESCE(s."imageUrn",'https://www.gravatar.com/avatar?d=mp&f=y)`;
        const subs = await AppDataSource
            .createQueryBuilder()
            .select(`s.title,s.name,${imageUrlExp} as "imageUrl",count(p.id) as "postCount"`)
            .from(Sub, "s")
            .leftJoin(Post, "p", `s.name = p."subName"`)
            .groupBy(`s.title, s.name, "imageUrl"`)
            .orderBy(`"postCount","DESC"`)
            .limit(5)
            .execute();
        return res.json(subs);
    } catch (error) {
        return res.status(500).json({error: "문제가 발생했습니다."});
    }
};

const router = Router();

router.post("/", userMiddleware, authMiddleware, createSubs);
router.get("/sub/topSubs", topSubs);

export default router;