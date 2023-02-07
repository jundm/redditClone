import type {NextPage} from 'next';
import React from "react";
import Link from "next/link";
import InputGroup from "../components/InputGroup";
import {useRouter} from "next/router";

interface LoginProps {

}

const Login: NextPage = () => {
  const router = useRouter()
  return (
      <div className="bg-white">
          <div className="flex flex-col items-center justify-center h-screen p-6">
              <div className="w-10/12 mx-auto md:w-96">
                  <h1 className="mb-2 text-lg font-medium">로그인</h1>
                  <form onSubmit={handleSubmit}>
                      <InputGroup
                          placeholder="Username"
                          value={username}
                          error={errors.username}
                          setValue={setUsername}/>
                      <InputGroup
                          placeholder="Password"
                          value={password}
                          error={errors.password}
                          setValue={setPassword}/>
                      <button
                          className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
                         로그인
                      </button>
                  </form>
                  <small>
                      아직 아이디가 없나요?
                      <Link href="/register">
                          <a className="ml-1 text-blue-500 uppercase">회원가입</a>
                      </Link>
                  </small>
              </div>
          </div>
      </div>
  );
}

export default Login