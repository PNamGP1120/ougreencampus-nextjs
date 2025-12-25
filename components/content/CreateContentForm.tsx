"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createContent, listCategories, listTags } from "@/lib/contents";
import type { Category, Tag } from "@/types/content";
import Editor from "@/components/editor/Editor";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function CreateContentForm() {
    const router = useRouter();

    // ===== FORM STATE =====
    const [title, setTitle] = useState("");
    const [body, setBody] = useState<string>(""); // ✅ chắc chắn string
    const [image, setImage] = useState<string | undefined>(undefined);
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [tagIds, setTagIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    // ===== DATA =====
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);

    // ===== LOAD CATEGORY & TAG =====
    useEffect(() => {
        listCategories().then(setCategories);
        listTags().then(setTags);
    }, []);

    // ===== TOGGLE TAG =====
    const toggleTag = (id: number) => {
        setTagIds((prev) =>
            prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
        );
    };

    // ===== UPLOAD FEATURE IMAGE =====
    const handleImageUpload = async (file: File) => {
        setUploadingImage(true);
        try {
            const url = await uploadToCloudinary(file);
            setImage(url); // ✅ luôn là string
        } catch {
            alert("Upload ảnh đại diện thất bại");
        } finally {
            setUploadingImage(false);
        }
    };

    // ===== SUBMIT =====
    const submit = async () => {
        if (!title.trim()) return alert("Vui lòng nhập tiêu đề");
        if (!body.trim()) return alert("Vui lòng nhập nội dung");
        if (!categoryId) return alert("Vui lòng chọn danh mục");

        setLoading(true);

        try {
            const payload = {
                title: title.trim(),
                body, // string
                image,
                category_id: categoryId, // number
                tags: tagIds.length > 0 ? tagIds : undefined,
            };

            const res = await createContent(payload);

            // ✅ điều hướng sang trang chi tiết
            router.push(`/contents/${res.id}`);
        } catch (e) {
            console.error(e);
            alert("Tạo bài viết thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 rounded-2xl bg-white p-6 shadow">
            <h1 className="text-xl font-semibold text-gray-800">
                ✍️ Tạo bài viết mới
            </h1>

            {/* ===== TITLE ===== */}
            <input
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Tiêu đề bài viết"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* ===== FEATURE IMAGE ===== */}
            <div>
                <p className="mb-2 font-medium text-gray-700">
                    Ảnh đại diện (tuỳ chọn)
                </p>

                {image && (
                    <img
                        src={image}
                        alt="Preview"
                        className="mb-3 h-40 w-full rounded-xl object-cover"
                    />
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            handleImageUpload(e.target.files[0]);
                        }
                    }}
                />

                {uploadingImage && (
                    <p className="mt-1 text-sm text-gray-500">
                        Đang upload ảnh...
                    </p>
                )}
            </div>

            {/* ===== CATEGORY ===== */}
            <select
                className="w-full rounded-xl border px-4 py-3"
                value={categoryId ?? ""}
                onChange={(e) =>
                    setCategoryId(
                        e.target.value ? Number(e.target.value) : undefined
                    )
                }
            >
                <option value="">-- Chọn danh mục --</option>
                {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            {/* ===== TAGS ===== */}
            <div>
                <p className="mb-2 font-medium text-gray-700">Tags</p>
                <div className="flex flex-wrap gap-2">
                    {tags.map((t) => {
                        const active = tagIds.includes(t.id);
                        return (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => toggleTag(t.id)}
                                className={`rounded-full border px-4 py-1 text-sm transition ${
                                    active
                                        ? "bg-green-600 text-white"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                {t.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ===== BODY ===== */}
            <div>
                <p className="mb-2 font-medium text-gray-700">Nội dung</p>
                <Editor value={body} onChangeHtml={setBody} />
            </div>

            {/* ===== SUBMIT ===== */}
            <button
                onClick={submit}
                disabled={loading}
                className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
                {loading ? "Đang tạo..." : "Tạo bài viết"}
            </button>
        </div>
    );
}
