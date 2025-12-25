"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginClient() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const callbackUrl = searchParams.get("callback") || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = async () => {
        // login logic
        router.push(callbackUrl);
    };

    return (
        <div className="mx-auto max-w-md p-6">
            <h1 className="mb-4 text-xl font-bold">Đăng nhập</h1>

            <input
                className="mb-3 w-full border p-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                className="mb-4 w-full border p-2"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                onClick={submit}
                className="w-full rounded bg-green-600 py-2 text-white"
            >
                Đăng nhập
            </button>
        </div>
    );
}
