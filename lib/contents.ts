import api from "./api";
import type { ApiResponse } from "@/types/api";
import type { Content, Category, Tag } from "@/types/content";

/**
 * GET /api/contents
 */
export async function listContents(params?: {
    search?: string;
    category_id?: number;
    tag_id?: number;
    page?: number;
    limit?: number;
}) {
    const res = await api.get<
        ApiResponse<{
            items: Content[];
            pagination: any;
        }>
    >("/contents", { params });

    return res.data.data;
}

/**
 * GET /api/contents/:id
 */
export async function getContent(id: number) {
    const res = await api.get<ApiResponse<Content>>(
        `/contents/${id}`
    );
    return res.data.data;
}

/**
 * POST /api/contents
 */
export async function createContent(payload: {
    title: string;
    body: string;
    image?: string;
    category_id?: number;
    tags?: number[];
}) {
    const res = await api.post<ApiResponse<{ id: number }>>(
        "/contents",
        payload
    );
    return res.data.data;
}

/**
 * PUT /api/contents/:id
 */
export async function updateContent(
    id: number,
    payload: {
        title?: string;
        body?: string;
        image?: string;
    }
) {
    const res = await api.put<ApiResponse<null>>(
        `/contents/${id}`,
        payload
    );
    return res.data.success;
}

/**
 * DELETE /api/contents/:id
 */
export async function deleteContent(id: number) {
    const res = await api.delete<ApiResponse<null>>(
        `/contents/${id}`
    );
    return res.data.success;
}

/**
 * GET /api/categories
 */
export async function listCategories() {
    const res = await api.get<ApiResponse<Category[]>>(
        "/categories"
    );
    return res.data.data;
}

/**
 * GET /api/tags
 */
export async function listTags() {
    const res = await api.get<ApiResponse<Tag[]>>("/tags");
    return res.data.data;
}
