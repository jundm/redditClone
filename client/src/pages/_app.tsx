import React from "react";
import type {AppProps} from 'next/app';
import axios from "axios";
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
        <SWRConfig value={{fetcher}}>
            <AuthProvider>
                {!authRoute && <NavBar/>}
                <div className={authRoute ? "" : "pt-4"}>
                    <Component {...pageProps} />
                </div>
            </AuthProvider>
        </SWRConfig>
    );
}

export default MyApp;
