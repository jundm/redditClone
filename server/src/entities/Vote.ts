import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import BaseEntity from "./Entity";
import User from "./User";
import Post from "./Post";

@Entity("votes")
export default class Sub extends BaseEntity {
    @Column()
    value: number;

    @ManyToOne(() => User)
    @JoinColumn({name: "username", referencedColumnName: "username"})
    user: User;

    @Column({nullable: true})
    postId: number;

    @ManyToOne(() => Post)
    post: Post;

    @Column({nullable: true})
    commendId: number;

    @ManyToOne(() => Comment)
    comment: Comment;
}