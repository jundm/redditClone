import React from "react";
import type {AppProps} from 'next/app';
import axios from "axios";
import Head from "next/head";
import {useRouter} from "next/router";
import {SWRConfig} from "swr";
import '@styles/globals.css';
import NavBar from "@components/NavBar";
import {AuthProvider} from "@context/auth";

function MyApp({Component, pageProps}: AppProps) {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/api';
    axios.defaults.withCredentials = true;

    const {pathname} = useRouter();
    const authRoutes = ['/register', '/login'];
    const authRoute = authRoutes.includes(pathname);
    const fetcher = async (url: string) => {
        try {
            const res = await axios.get(url);
            return res.data;
        } catch (error: any) {
            throw error.response.data;
        }
    };
    return (
        <>
            <Head>
                <script defer src="https://use.fontawesome.com/releases/v5.15.4/js/all.js"
                        integrity="sha384-rOA1PnstxnOBLzCLMcre8ybwbTmemjzdNlILg8O7z1lUkLXozs4DHonlDtnE7fpc"
                        crossOrigin="anonymous"/>
            </Head>
            <SWRConfig value={{fetcher}}>
                <AuthProvider>
                    {!authRoute && <NavBar/>}
                    <div className={authRoute ? "" : "pt-4"}>
                        <Component {...pageProps} />
                    </div>
                </AuthProvider>
            </SWRConfig>
        </>
    );
}

export default MyApp;
