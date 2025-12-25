"use client";

import { useEffect, useState } from "react";
import { listContents } from "@/lib/contents";
import type { Content } from "@/types/content";

export function useContents(params?: {
    search?: string;
    category_id?: number;
    tag_id?: number;
}) {
    const [items, setItems] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        listContents(params)
            .then((res) => setItems(res.items))
            .finally(() => setLoading(false));
    }, [JSON.stringify(params)]);

    return { items, loading };
}
