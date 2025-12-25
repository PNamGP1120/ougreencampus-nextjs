"use client";

import { useEffect, useState } from "react";
import { getMe } from "@/lib/users";
import type { User } from "@/types/auth";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const refresh = async () => {
        setLoading(true);
        try {
            const me = await getMe();
            setUser(me);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refresh();
    }, []);

    return {
        user,
        loading,
        isAuthenticated: !!user,
        refresh,
    };
}
