import {User} from "../types";
import {createContext, ReactNode} from "react";

interface State {
    authenticated: boolean;
    user: User | undefined;
    loading: boolean;
}

const StateContext = createContext<State>({
    authenticated: false,
    user: undefined,
    loading: true
});

const DispatchContext = createContext<any>(null);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>{children}</StateContext.Provider>
        </DispatchContext.Provider>
    );
};