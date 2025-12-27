"use client";

import { useEffect, useState } from "react";
import { getMe } from "@/lib/users";
import type { User } from "@/types/auth";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const refresh = async () => {
        // 🔥 KHÔNG CÓ TOKEN → KHÔNG GỌI API
        const token =
            typeof window !== "undefined"
                ? localStorage.getItem("token")
                : null;

        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const me = await getMe();
            setUser(me);
        } catch {
            // token không hợp lệ
            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refresh();
        // ❗ chỉ chạy 1 lần
    }, []);

    return {
        user,
        loading,
        isAuthenticated: !!user,
        refresh,
    };
}
