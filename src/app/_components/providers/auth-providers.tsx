'use client';

import { createContext, useContext } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { ChildrenProps } from "@/types/props/children";

type AuthContextType = ReturnType<typeof useAuth>;

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: ChildrenProps) {
    const auth = useAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);