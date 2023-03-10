import React, {FormEvent, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import useSWR from "swr";
import Link from "next/link";
import {Post} from "@types";
import dayjs from "dayjs";
import {useAuthState} from "@context/auth";

interface PostPageProps {

}

const PostPage = () => {
    const router = useRouter();
    const {identifier, sub, slug} = router.query;
    const {authenticated, user} = useAuthState();
    const [newComment, setNewComment] = useState("");
    const {data: post, error} = useSWR<Post>(identifier && slug ? `/posts/${identifier}/${slug}` : null);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (newComment.trim() === "") return;
        try {
            await axios.post(`/posts/${post?.identifier}/${post?.slug}/comments`, {
                body: newComment
            });
            setNewComment("");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="flex max-w-5xl px-4 pt-5 mx-auto">
            <div className="w-full md:mr-3 md:w-8/12">
                <div className="bg-white rounded">
                    {post && (
                        <>
                            <div className="flex">
                                <div className="py-2 pr-2">
                                    <div className="flex items-center">
                                        <p className="text-xs text-gray-400">
                                            Posted By
                                            <i className="fas fa-abacus"></i>
                                            <Link href={`/u/${post.username}`}>
                                                <a className="mx-1 hover:underline">
                                                    /u/{post.username}
                                                </a>
                                            </Link>
                                            <Link href={post.url}>
                                                <a className="mx-1 hover:underline">
                                                    {dayjs(post.createdAt).format("YYYY-MM-DD HH:mm")}
                                                </a>
                                            </Link>
                                        </p>
                                    </div>
                                    <h1 className="my-1 text-xl font-medium">{post.title}</h1>
                                    <p className="my-3 text-sm">{post.body}</p>
                                    <div className="flex">
                                        <button>
                                            <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                                            <span className="font-bold">
                                                {post.commentCount} Comments
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {/*  ?????? ?????? ??????  */}
                                <div className="pr-6 mb-4">{authenticated ? (
                                    <div>
                                        <p className="mb-1 text-xs">
                                            <Link href={`/u/${user?.username}`}>
                                                <a className="font-semibold text-blue-500">
                                                    {user?.username}
                                                </a>
                                            </Link>
                                            {" "}?????? ?????? ??????
                                        </p>
                                        <form onSubmit={handleSubmit}>
                                            <textarea
                                                className="w-full p-3 border-gray-300 rounded focus:outline-none focus:border-gray-600"
                                                onChange={e => setNewComment(e.target.value)}
                                                value={newComment}
                                            >

                                            </textarea>
                                            <div className="flex justify-end">
                                                <button
                                                    className="px-3 py-1 text-white bg-gray-400 rounded"
                                                    disabled={newComment.trim() === ""}
                                                >
                                                    ?????? ??????
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between px-2 py-4 border border-gray-200">
                                        <p className="font-semibold text-gray-400">
                                            ?????? ????????? ????????? ????????? ????????????.
                                        </p>
                                        <div>
                                            <Link href={`/login`}>
                                                <a className="px-3 py-1 text-white bg-gray-400 rounded">
                                                    ?????????
                                                </a>

                                            </Link>
                                        </div>
                                    </div>)
                                }
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostPage;