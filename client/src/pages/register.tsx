import type {NextPage} from 'next';
import Link from "next/link";
import React, {FormEvent, useState} from "react";
import InputGroup from "../components/InputGroup";
import axios from "axios";
import {useRouter} from "next/router";

interface RegisterProps {

}

const Register: NextPage = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({email: "", username: "", password: ""});

    const router = useRouter();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const res = await axios.post('/auth/register', {
            email, username, password
        });

    };
    return (
        <div className="bg-white">
            <div className="flex flex-col items-center justify-center h-screen p-6">
                <div className="w-10/12 mx-auto md:w-96">
                    <h1 className="mb-2 text-lg font-medium">회원가입</h1>
                    <form onSubmit={handleSubmit}>
                        <InputGroup
                            placeholder="Email"
                            value={email}
                            error={error.email}
                            setValue={setEmail}/>
                        <InputGroup
                            placeholder="Username"
                            value={username}
                            error={error.username}
                            setValue={setUsername}/>
                        <InputGroup
                            placeholder="Password"
                            value={password}
                            error={error.password}
                            setValue={setPassword}/>
                        <button
                            className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
                            회원가입
                        </button>
                    </form>
                    <small>
                        이미 가입하셨나요?
                        <Link href="/login">
                            <a className="ml-1 text-blue-500 uppercase">로그인</a>
                        </Link>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Register;