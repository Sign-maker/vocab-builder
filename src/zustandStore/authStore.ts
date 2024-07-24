import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { USERS_API_ENDPOINT, USERS_ENDPOINTS } from "../constants/apiConstants";

type User = {
  id?: string;
  name: string;
  email: string;
};

type signUpCredentials = {
  name: string;
  email: string;
  password: string;
};

type signInCredentials = {
  email: string;
  password: string;
};

type State = {
  user: User;
  token?: string;
  isLoading: boolean;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  error: string | null | unknown;
};

type Actions = {
  signUp: (credentials: signUpCredentials) => void;
  signIn: (credentials: signInCredentials) => void;
  signOut: () => void;
  getCurrentUser: () => void;
};

const initialState: State = {
  user: { id: "", name: "", email: "" },
  token: "",
  isLoading: false,
  isLoggedIn: false,
  isRefreshing: true,
  error: null,
};

const headers = new Headers({
  "Content-Type": "application/json",
});

const setAuthHeader = (token: string) => {
  headers.set("Authorization", `Bearer ${token}`);
};

const clearAuthHeader = () => {
  headers.delete("Authorization");
};
export const useAuthStore = create<State & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        signUp: async (credentials) => {
          set({ isLoading: true });

          try {
            const response = await fetch(
              `${USERS_API_ENDPOINT}${USERS_ENDPOINTS.signup}`,
              {
                method: "POST",
                body: JSON.stringify(credentials),
                headers,
              }
            );

            if (!response.ok) {
              const error = await response.json();
              throw new Error(`${response.statusText}. ${error.message}`);
            }

            const { name, email, token } = await response.json();

            set((state) => ({
              user: { ...state.user, name, email },
              token,
              isLoggedIn: true,
              error: null,
            }));

            setAuthHeader(token);
          } catch (error) {
            if (error instanceof Error) {
              set({ error: error.message });
            } else {
              set({ error });
            }
          } finally {
            set({ isLoading: false });
          }
        },

        signIn: async (credentials) => {
          set({ isLoading: true });

          try {
            const response = await fetch(
              `${USERS_API_ENDPOINT}${USERS_ENDPOINTS.signin}`,
              {
                method: "POST",
                body: JSON.stringify(credentials),
                headers,
              }
            );

            if (!response.ok) {
              const error = await response.json();
              throw new Error(`${response.statusText}. ${error.message}`);
            }

            const { name, email, token } = await response.json();

            set((state) => ({
              user: { ...state.user, name, email },
              token,
              isLoggedIn: true,
              error: null,
            }));

            setAuthHeader(token);
          } catch (error) {
            if (error instanceof Error) {
              set({ error: error.message });
            } else {
              set({ error });
            }
          } finally {
            set({ isLoading: false });
          }
        },

        signOut: async () => {
          set({ isLoading: true });

          try {
            const response = await fetch(
              `${USERS_API_ENDPOINT}${USERS_ENDPOINTS.signout}`,
              {
                method: "POST",
                headers,
              }
            );

            if (!response.ok) {
              const error = await response.json();
              throw new Error(`${response.statusText}. ${error.message}`);
            }

            set(() => ({
              ...initialState,
              isRefreshing: false,
            }));
            clearAuthHeader;
          } catch (error) {
            if (error instanceof Error) {
              set({ error: error.message });
            } else {
              set({ error });
            }
          } finally {
            set({ isLoading: false });
          }
        },

        getCurrentUser: async () => {
          try {
            const persistedToken = get().token;
            if (!persistedToken) {
              throw new Error("Failed to fetch user");
            }
            setAuthHeader(persistedToken);

            set({ isRefreshing: true });

            const response = await fetch(
              `${USERS_API_ENDPOINT}${USERS_ENDPOINTS.current}`,
              {
                method: "GET",
                headers,
              }
            );

            if (!response.ok) {
              const error = await response.json();
              throw new Error(`${response.statusText}. ${error.message}`);
            }

            const { _id, name, email } = await response.json();

            set((state) => ({
              user: { ...state.user, id: _id, name, email },
              isLoggedIn: true,
              error: null,
            }));
          } catch (error) {
            if (error instanceof Error) {
              set({ error: error.message });
            } else {
              set({ error });
            }
          } finally {
            set({ isRefreshing: false });
          }
        },
      }),
      {
        name: "Auth",
        partialize: (state) => ({ token: state.token }),
      }
    )
  )
);
