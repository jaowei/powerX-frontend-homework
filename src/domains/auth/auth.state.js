import { useReducer, createContext, useContext } from "react"
import { useMutation, useQuery } from "react-query";
import { BASE_URL } from "../../const";

const ACCESS_TOKEN_STORAGE = "auth";

const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE);

const AUTH_DEFAULT_STATE = storedAccessToken 
    ? {
        status: "authenticated",
        accessToken: storedAccessToken,
    }
    : {
        status: "anonymous",
        accessToken: null,        
    };

const AuthContext = createContext();

const authReducer = (state, event) => {
    switch(event.type) {
        case "login":
            return {
                accessToken: event.accessToken,
                status: "authenticated",
            };

        case "logout":
            return {
                accessToken: null,
                status: "anonymous",
            };

        case "register":
            return {
                accessToken: null,
                status: "anonymous"
            }
        
        default:
            throw new Error (`Unsupported event type ${event.type} in authReducer`);
    };
};

export const useAuthState = () => {
    const [state, dispatch] = useReducer(authReducer, AUTH_DEFAULT_STATE)

    const login = (accessToken) => 
        dispatch({
            type: "login",
            accessToken,
        });

    const logout = () =>
        dispatch({
            type:"logout",
        });

    const register = () => 
        dispatch({
            type:"register"
        })

    return {
        ...state,
        login,
        logout,
        register,
    };
};

export const AuthProvider = ({ children }) => {
    const auth = useAuthState();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const auth = useContext(AuthContext)

    if (!auth) {
        throw new Error("Your application must be wrapped with AuthProvider")
    }

    return auth
}

const login = (email, password) => {
    return (
        fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: email,
                password: password,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
            throw new Error(res.statusText)
        })
    )
}

const register = (email, username, password) => {
    return (
        fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: username,
                email: email,
                password: password,
                avatar: "http://github.com/malcolm-kee.png"
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
            throw new Error(res.statusText)
        })
    )
}

const whoami = (token) => {
    return (
        fetch(`${BASE_URL}/whoami`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
            throw new Error(res.statusText)
        })
    )
}

export const useLogin = () => {
    const auth = useContext(AuthContext);

    if (!auth) {
        throw new Error("Your application must be wrapped with AuthProvider")
    };

    return function invokeLogin({ email, password }) {
        return login(email, password).then((res) => {
            auth.login(res.access_token);
            localStorage.setItem(ACCESS_TOKEN_STORAGE, res.access_token)
        });
    };
};

export const useLogout = () => {
    const auth = useContext(AuthContext)

    if (!auth) {
        throw new Error("Your application must be wrapped with AuthProvider")
    }

    return () => {
        auth.logout();
        localStorage.removeItem(ACCESS_TOKEN_STORAGE)
    }

}

export const useRegisterMutation = () => {
    const auth = useContext(AuthContext);

    if (!auth) {
        throw new Error("Your application must be wrapped with AuthProvider")
    };

    function invokeRegister ({ email, username, password }) {
        return register(email, username, password).then((res) => {
            auth.register()
        })
    }

    return useMutation((data) => invokeRegister(data))
}

export const useWhoami = (token) => {
    return useQuery((["userId", token]), () => whoami(token), {
        staleTime: 30000
    })
}