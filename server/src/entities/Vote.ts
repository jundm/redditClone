import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import BaseEntity from "@entities/Entity";
import User from "@entities/User";
import Post from "@entities/Post";
import Comment from "@entities/Comment";

@Entity("votes")
export default class Vote extends BaseEntity {
    @Column()
    value: number;

    @ManyToOne(() => User)
    @JoinColumn({name: "username", referencedColumnName: "username"})
    user: User;

    @Column()
    username: string;

    @Column({nullable: true})
    postId: number;

    @ManyToOne(() => Post)
    post: Post;

    @Column({nullable: true})
    commendId: number;

    @ManyToOne(() => Comment)
    comment: Comment;
}