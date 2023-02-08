import {User} from "../types";
import {createContext, ReactNode, useReducer} from "react";

interface State {
    authenticated: boolean;
    user: User | undefined;
    loading: boolean;
}

interface Action {
    type: string;
    payload: any;
}

const StateContext = createContext<State>({
    authenticated: false,
    user: undefined,
    loading: true
});

const DispatchContext = createContext<any>(null);


const reducer = (state: State, {type, payload}: Action) => {
    switch (type) {
        case "LOGIN":
            return {
                ...state,
                authenticated: true,
                user: payload
            };
        case "LOGOUT":
            return {
                ...state,
                authenticated: false,
                user: null
            };
        case "STOP_LOADING":
            return {
                ...state,
                loading: false
            };
        default:
            throw new Error(`Unknown action type: ${type}`);
    }
};
export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, {
        user: null,
        authenticated: false,
        loading: true
    });
    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>{children}</StateContext.Provider>
        </DispatchContext.Provider>
    );
};