"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register as registerApi } from "@/lib/auth";

export default function RegisterForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("123456");
    const [err, setErr] = useState<string | null>(null);
    const [ok, setOk] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErr(null);
        setOk(null);
        setLoading(true);

        try {
            await registerApi({ email, name, password });
            setOk("Đăng ký thành công. Vui lòng đăng nhập.");
            setTimeout(() => router.push("/login"), 800);
        } catch (e: any) {
            setErr(e?.response?.data?.message || "Đăng ký thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={submit} className="rounded-lg border bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-semibold">Đăng ký</h1>
            <p className="mt-1 text-sm text-gray-600">Tạo tài khoản OU Green Campus</p>

            <div className="mt-4 space-y-3">
                <div>
                    <label className="text-sm">Họ tên</label>
                    <input
                        className="mt-1 w-full rounded border px-3 py-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                    />
                </div>

                <div>
                    <label className="text-sm">Email</label>
                    <input
                        className="mt-1 w-full rounded border px-3 py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sv@ou.edu.vn"
                    />
                </div>

                <div>
                    <label className="text-sm">Mật khẩu</label>
                    <input
                        className="mt-1 w-full rounded border px-3 py-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                </div>

                {err && <p className="text-sm text-red-600">{err}</p>}
                {ok && <p className="text-sm text-green-700">{ok}</p>}

                <button
                    disabled={loading}
                    className="w-full rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-60"
                >
                    {loading ? "Đang tạo..." : "Tạo tài khoản"}
                </button>

                <button
                    type="button"
                    className="w-full rounded border px-4 py-2"
                    onClick={() => router.push("/login")}
                >
                    Đã có tài khoản? Đăng nhập
                </button>
            </div>
        </form>
    );
}
