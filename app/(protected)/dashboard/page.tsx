"use client";

import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function DashboardPage() {
    const { user, loading } = useRequireAuth();

    if (loading) return <p>Loading...</p>;
    if (!user) return null;

    return (
        <div className="rounded bg-white p-6 shadow">
            <h1 className="text-2xl font-semibold">
                Xin chào {user.name}
            </h1>
            <p className="mt-2 text-gray-600">
                Vai trò: <b>{user.role}</b>
            </p>
        </div>
    );
}
