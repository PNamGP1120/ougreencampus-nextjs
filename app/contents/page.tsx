"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/layout/Footer";
import ContentCard from "@/components/content/ContentCard";

interface Content {
    id: number;
    title: string;
    body: string;
    image?: string;
}

export default function ContentsPage() {
    // ===== STATE =====
    const [items, setItems] = useState<Content[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(9);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ===== FETCH DATA =====
    const fetchContents = async () => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
            });

            if (search.trim() !== "") {
                params.append("search", search.trim());
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/contents?${params.toString()}`,
                { cache: "no-store" }
            );

            if (!res.ok) {
                throw new Error("Failed to fetch contents");
            }

            const json = await res.json();

            // ✅ LUÔN đảm bảo items là array
            setItems(json?.data?.items ?? []);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    // ===== EFFECT =====
    useEffect(() => {
        fetchContents();
    }, [page]);

    // ===== SEARCH HANDLER =====
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchContents();
    };

    // ===== RENDER =====
    return (
        <>
            {/* ===== NAVBAR ===== */}
            <Navbar />

            {/* ===== MAIN CONTENT ===== */}
            <main className="mx-auto max-w-7xl px-4 py-8 min-h-[70vh]">
                <h1 className="mb-6 text-2xl font-bold text-green-800">
                    Tin tức bảo vệ môi trường – Hướng tới phát triển bền vững
                </h1>


                {/* ===== SEARCH BAR ===== */}
                <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                    <input
                        type="text"
                        placeholder="Tìm kiếm bài viết..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 rounded border px-3 py-2"
                    />
                    <button
                        type="submit"
                        className="rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800"
                    >
                        Tìm kiếm
                    </button>
                </form>

                {/* ===== LOADING ===== */}
                {loading && (
                    <p className="text-gray-500">Đang tải bài viết...</p>
                )}

                {/* ===== ERROR ===== */}
                {error && <p className="text-red-500">{error}</p>}

                {/* ===== EMPTY ===== */}
                {!loading && items.length === 0 && (
                    <p className="text-gray-500">Không có bài viết nào.</p>
                )}

                {/* ===== LIST ===== */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {items.map((c) => (
                        <ContentCard key={c.id} content={c} />
                    ))}
                </div>

                {/* ===== PAGINATION ===== */}
                <div className="mt-8 flex justify-center gap-4">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="rounded border px-4 py-2 disabled:opacity-50"
                    >
                        Trang trước
                    </button>

                    <span className="px-4 py-2">Trang {page}</span>

                    <button
                        onClick={() => setPage((p) => p + 1)}
                        className="rounded border px-4 py-2"
                    >
                        Trang sau
                    </button>
                </div>
            </main>

            {/* ===== FOOTER ===== */}
            <Footer />
        </>
    );
}
