import React from "react";
import {useRouter} from "next/router";
import axios from "axios";
import useSWR from "swr";
import {Post} from "@types";

interface PostPageProps {

}

const PostPage = () => {
    const router = useRouter();
    const {identifier, sub, slug} = router.query;

    const {data: post, error} = useSWR<Post>(identifier && slug ? `/posts/${identifier}/${slug}` : null);
    return (
        <>

        </>
    );
};

export default PostPage[