import React, {FormEvent, useState} from "react";
import InputGroup from "@components/InputGroup";
import axios from "axios";
import {router} from "next/client";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";

interface SubCreateProps {

}

const SubCreate = () => {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState<any>({});
    const router = useRouter();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const res = await axios.post('/subs', {name, title, description});
            router.push(`/r/${res.data.name}`);
        } catch (error) {

        }
    };
    return (
        <div className="flex flex-col justify-center pt-16">
            <div className="w-10/12 mx-auto md:w-96">
                <h1 className="mb-2 text-lg font-medium">
                    커뮤니티 만들기
                </h1>
                <hr/>
                <form action="" onSubmit={handleSubmit}>
                    <div className="my-6">
                        <p className="font-medium">Name</p>
                        <p className="mb-2 text-xs text-gray-400">커뮤니티 이름은 변경할 수 없습니다</p>
                        <InputGroup
                            placeholder="이름"
                            value={name}
                            error={errors.name}
                            setValue={setName}
                        />
                    </div>
                    <div className="my-6">
                        <p className="font-medium">Title</p>
                        <p className="mb-2 text-xs text-gray-400">주제를 나타냅니다. 언제든지 변견할 수 있습니다.</p>
                        <InputGroup
                            placeholder="제목"
                            value={title}
                            error={errors.title}
                            setValue={setTitle}
                        />
                    </div>
                    <div className="my-6">
                        <p className="font-medium">Description</p>
                        <p className="mb-2 text-xs text-gray-400">커뮤니티에 대한 설명입니다.</p>
                        <InputGroup
                            placeholder="설명"
                            value={description}
                            error={errors.description}
                            setValue={setDescription}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button className="px-4 py-1 text-sm font-semibold rounded text-white bg-gray-400 border">
                            커뮤니티 만들기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubCreate;

// @ts-ignore
export const getServerSideProps = async ({req, res}) => {
    try {
        const cookie = req.headers.cookie;
        //쿠키가 없다면 에러를 보내기
        if (!cookie) throw new Error("Missing auth token cookie");
        // 쿠키가 있다면 그 쿠키를 이용해서 백엔드에서 인증 처리하기
        await axios.get("/auth/me", {headers: {cookie}});
        return {props: {}};
    } catch (error) {
        res.writeHead(307,{Location:"/login"}).end()
    }

};