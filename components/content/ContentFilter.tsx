"use client";

import { useState } from "react";

export default function ContentFilter({
                                          onSearch,
                                      }: {
    onSearch: (keyword: string) => void;
}) {
    const [keyword, setKeyword] = useState("");

    return (
        <div className="mb-6 flex gap-2">
            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm kiếm bài viết..."
                className="flex-1 rounded border px-3 py-2"
            />
            <button
                onClick={() => onSearch(keyword)}
                className="rounded bg-green-600 px-4 py-2 text-white"
            >
                Tìm
            </button>
        </div>
    );
}
