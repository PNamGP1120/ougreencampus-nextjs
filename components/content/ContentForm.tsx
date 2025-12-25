"use client";

import { useState } from "react";
import { createContent, updateContent } from "@/lib/contents";
import { useRouter } from "next/navigation";
import type { Content } from "@/types/content";

export default function ContentForm({
                                        content,
                                    }: {
    content?: Content;
}) {
    const router = useRouter();

    const [title, setTitle] = useState(content?.title || "");
    const [body, setBody] = useState(content?.body || "");
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        setLoading(true);
        if (content) {
            await updateContent(content.id, { title, body });
            router.push(`/contents/${content.id}`);
        } else {
            const res = await createContent({
                title,
                body,
            });
            router.push(`/contents/${res.id}`);
        }
    };

    return (
        <div className="space-y-4">
            <input
                className="w-full rounded border px-3 py-2"
                placeholder="Tiêu đề"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                className="w-full rounded border px-3 py-2 h-40"
                placeholder="Nội dung HTML"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />

            <button
                onClick={submit}
                disabled={loading}
                className="rounded bg-green-600 px-4 py-2 text-white"
            >
                {content ? "Cập nhật" : "Tạo bài viết"}
            </button>
        </div>
    );
}
