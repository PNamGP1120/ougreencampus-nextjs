"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login as loginApi } from "@/lib/auth";
import { setCookie } from "@/lib/cookies";
import Image from "next/image";
import Logo from "@/components/common/Logo";


const COOKIE_NAME =
    process.env.NEXT_PUBLIC_TOKEN_COOKIE || "ogc_token";

export default function LoginForm() {
    const router = useRouter();
    const params = useSearchParams();
    const next = params.get("next");

    const [email, setEmail] = useState("admin@ou.edu.vn");
    const [password, setPassword] = useState("123456");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await loginApi({ email, password });

            // lưu token để proxy đọc được
            setCookie(COOKIE_NAME, res.token, 7);
            localStorage.setItem("token", res.token);

            // ưu tiên next param
            if (next) {
                router.push(next);
                return;
            }

            // redirect theo role
            if (res.user.role === "admin") router.push("/admin");
            else if (res.user.role === "organizer") router.push("/organizer");
            else router.push("/student");
        } catch (e: any) {
            setError(e?.response?.data?.message || "Đăng nhập thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
            {/* ===== HEADER ===== */}
            <div className="mb-6 text-center">
                <div className="mx-auto mb-3 flex justify-center">
                    <Logo
                        size={64}
                        showText={false}
                        href=""
                    />
                </div>

                <p className="mt-1 text-sm font-medium text-green-600">
                    OU Green Campus
                </p>

                <h1 className="mt-1 text-2xl font-bold text-gray-800">
                    Đăng nhập
                </h1>
            </div>



            {/* ===== FORM ===== */}
            <form onSubmit={submit} className="space-y-4">
                {/* Email */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@ou.edu.vn"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                        required
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-600">
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                        required
                    />
                </div>

                {/* Error */}
                {error && (
                    <div className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
                >
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>

                {/* Register */}
                <button
                    type="button"
                    onClick={() => router.push("/register")}
                    className="w-full rounded-xl border border-gray-300 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    Tạo tài khoản mới
                </button>
            </form>

            {/* ===== FOOTER ===== */}
            <p className="mt-6 text-center text-xs text-gray-400">
                © {new Date().getFullYear()} OU Green Campus
            </p>
        </div>
    );
}
