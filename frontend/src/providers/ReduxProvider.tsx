"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { SessionProvider } from "next-auth/react";
import InactivityTimer from "../components/auth/InactivityTimer";


export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider refetchOnWindowFocus={false} refetchInterval={5 * 60}>
            <InactivityTimer />
            <Provider store={store}>{children}</Provider>
        </SessionProvider>)
}