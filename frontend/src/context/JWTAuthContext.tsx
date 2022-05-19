import React, { createContext, useEffect, useReducer, useRef } from "react";
import axiosInstance from "../services/axios";
import { TokenPayload } from "../types/auth.types";
import { User } from "../types/user.types";
import { getSession, resetSession, setSession } from "../utils/sessions";

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  googleLogin: (user: User, tokens: TokenPayload) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

type InitializeAction = {
  type: "INITIALIZE";
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type LoginAction = {
  type: "LOGIN";
  payload: {
    user: User;
  };
};

type LogoutAction = {
  type: "LOGOUT";
};

type Action = InitializeAction | LoginAction | LogoutAction;

const initialAuthState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers: Record<
  string,
  (state: AuthState, action: Action) => AuthState
> = {
  INITIALIZE: (state: AuthState, action: InitializeAction): AuthState => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: AuthState, action: LoginAction): AuthState => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: AuthState): AuthState => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state: AuthState, action: Action): AuthState =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext<AuthContextValue>({
  ...initialAuthState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  googleLogin: () => Promise.resolve(),
});

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const isMounted = useRef(false);
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    if (isMounted.current) return;

    const initialize = async () => {
      try {
        const { accessToken, refreshToken } = getSession();
        if (accessToken && refreshToken) {
          await fetchAndSetUser();
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialize();
    isMounted.current = true;
  }, []);

  const fetchAndSetUser = async () => {
    const response = await axiosInstance.get<User>("/v1/users/me");
    const { data: user } = response;
    dispatch({
      type: "INITIALIZE",
      payload: {
        isAuthenticated: true,
        user,
      },
    });
  };

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post<{
        user: User;
        tokens: TokenPayload;
      }>("/v1/auth/signin", {
        email,
        password,
      });
      const {
        data: { user, tokens },
      } = response;
      setSession(tokens.access, tokens.refresh);
      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  const googleLogin = (user: User, tokens: TokenPayload) => {
    setSession(tokens.access, tokens.refresh);
    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const logout = () => {
    resetSession();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
