"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Role } from "@/types/auth";
import { useAuth } from "./useAuth";

export function useRequireRole(role: Role | Role[]) {
    const router = useRouter();
    const { user, loading } = useAuth();
    const roles = Array.isArray(role) ? role : [role];

    useEffect(() => {
        if (!loading && user && !roles.includes(user.role)) {
            router.replace("/dashboard");
        }
    }, [user, loading, roles, router]);

    return { user, loading };
}
