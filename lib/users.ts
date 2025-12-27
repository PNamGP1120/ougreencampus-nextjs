import api from "./api";
import type { ApiResponse } from "@/types/api";
import type { User, Role, UserStatus } from "@/types/auth";

/**
 * GET /api/users/me
 */
export async function getMe() {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Not authenticated");
        }
    }

    const res = await api.get<ApiResponse<User>>("/users/me");
    return res.data.data;
}

/**
 * PUT /api/users/me
 */
export async function updateMe(payload: {
    name?: string;
    avatar?: string;
}) {
    const res = await api.put<ApiResponse<User>>(
        "/users/me",
        payload
    );
    return res.data.data;
}

/**
 * PUT /api/users/me/password
 */
export async function changeMyPassword(payload: {
    old_password: string;
    new_password: string;
}) {
    const res = await api.put<ApiResponse<null>>(
        "/users/me/password",
        payload
    );
    return res.data.success;
}

/**
 * GET /api/users (Admin)
 */
export async function listUsers(params?: {
    search?: string;
    role?: Role;
    status?: UserStatus;
    page?: number;
    limit?: number;
}) {
    const res = await api.get<ApiResponse<{
        items: User[];
        pagination: any;
    }>>("/users", { params });

    return res.data.data;
}

/**
 * GET /api/users/:id (Admin)
 */
export async function getUserById(id: number) {
    const res = await api.get<ApiResponse<User>>(
        `/users/${id}`
    );
    return res.data.data;
}

/**
 * PATCH /api/users/:id/role (Admin)
 */
export async function updateUserRole(
    id: number,
    role: Role
) {
    const res = await api.patch<ApiResponse<null>>(
        `/users/${id}/role`,
        { role }
    );
    return res.data.success;
}

/**
 * PATCH /api/users/:id/status (Admin)
 */
export async function updateUserStatus(
    id: number,
    status: UserStatus
) {
    const res = await api.patch<ApiResponse<null>>(
        `/users/${id}/status`,
        { status }
    );
    return res.data.success;
}
