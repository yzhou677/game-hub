import type { User } from "firebase/auth";
import { signInWithPopup, signOut } from "firebase/auth";
import { create } from "zustand";
import { auth, googleProvider } from "./firebase";

interface AuthState {
    user: User | null;
    initializing: boolean;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: User | null) => void;
    setInitializing: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    initializing: true,

    setUser: (user) => set({ user }),
    setInitializing: (v) => set({ initializing: v }),

    loginWithGoogle: async () => {
        await signInWithPopup(auth, googleProvider);
    },

    logout: async () => {
        await signOut(auth);
    },
}));