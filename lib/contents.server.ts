import type { Content } from "@/types/content";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

/**
 * Server-side fetch content detail
 */
export async function getContentServer(id: number) {
    const res = await fetch(`${BASE_URL}/contents/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Content not found");
    }

    const json = await res.json();
    return json.data as Content;
}
