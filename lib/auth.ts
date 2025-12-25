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
    return res.data.data;
}

/**
 * POST /api/auth/login
 */
export async function login(payload: {
    email: string;
    password: string;
}) {
    const res = await api.post<ApiResponse<LoginResult>>(
        "/auth/login",
        payload
    );
    return res.data.data; // { token, user }
}
