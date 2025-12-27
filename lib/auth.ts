import api from "./api";
import type { ApiResponse } from "@/types/api";
import type { LoginResult, User } from "@/types/auth";

/**
 * POST /api/auth/register
 */
export async function register(payload: {
    email: string;
    password: string;
    name: string;
    avatar?: string;
}) {
    const res = await api.post<ApiResponse<User>>(
        "/auth/register",
        payload
    );

    if (!res.data.success) {
        throw new Error(res.data.message || "Register failed");
    }

    return res.data.data;
}

/**
 * POST /api/auth/login
 */
export async function login(email: string, password: string) {
    const res = await api.post<ApiResponse<LoginResult>>(
        "/auth/login",
        { email, password }
    );

    if (!res.data.success) {
        throw new Error(res.data.message || "Login failed");
    }

    const { token, user } = res.data.data;

    // ✅ CLIENT ONLY
    if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
    }

    return { token, user };
}

/**
 * Logout helper
 */
export function logout() {
    if (typeof window !== "undefined") {
        localStorage.removeItem("token");
    }
}
