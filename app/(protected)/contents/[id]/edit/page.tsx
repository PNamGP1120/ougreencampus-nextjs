"use client";

import { useEffect, useState } from "react";
import { getContent } from "@/lib/contents";
import ContentForm from "@/components/content/ContentForm";
import type { Content } from "@/types/content";
import { useRequireRole } from "@/hooks/useRequireRole";

export default function EditContentPage({
                                            params,
                                        }: {
    params: { id: string };
}) {
    useRequireRole(["organizer", "admin"]);

    const [content, setContent] = useState<Content | null>(null);

    useEffect(() => {
        getContent(Number(params.id)).then(setContent);
    }, [params.id]);

    if (!content) return <p>Loading...</p>;

    return <ContentForm content={content} />;
}
