"use client";

import {useEffect, useState} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/lib/auth";


export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const next = searchParams.get("next");

    const [email, setEmail] = useState("admin@ou.edu.vn");
    const [password, setPassword] = useState("123456");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        console.log("LOGIN FORM HYDRATED");
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 🔥 BẮT BUỘC
        console.log("SUBMIT LOGIN");
        if (loading) return;

        setError(null);
        setLoading(true);

        try {
            const res = await login(email.trim(), password);

            // 🔁 redirect ưu tiên ?next=
            if (next) {
                router.replace(next);
                return;
            }

            // 🔁 redirect theo role
            switch (res.user.role) {
                case "admin":
                    router.replace("/admin");
                    break;
                case "organizer":
                    router.replace("/organizer");
                    break;
                default:
                    router.replace("/student");
            }
        } catch (err: any) {
            setError(err?.message || "Đăng nhập thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-md space-y-4 rounded-xl bg-white p-6 shadow"
        >
            <h1 className="text-center text-xl font-bold text-green-700">
                Đăng nhập
            </h1>

            {/* Email */}
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@ou.edu.vn"
                className="w-full rounded border px-3 py-2 outline-none focus:border-green-600"
                required
            />

            {/* Password */}
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                className="w-full rounded border px-3 py-2 outline-none focus:border-green-600"
                required
            />

            {/* Error */}
            {error && (
                <div className="rounded bg-red-50 px-3 py-2 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="w-full rounded bg-green-600 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
            >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
        </form>
    );
}
