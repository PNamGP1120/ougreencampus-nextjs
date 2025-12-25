"use client";

import { useRequireRole } from "@/hooks/useRequireRole";

export default function AdminPage() {
    const { user, loading } = useRequireRole("admin");

    if (loading) return <p>Loading...</p>;
    if (!user) return null;

    return (
        <div className="rounded bg-white p-6 shadow">
            <h1 className="text-2xl font-semibold">
                Admin Management
            </h1>
            <p className="mt-2 text-gray-600">
                Quản lý người dùng & hệ thống
            </p>
        </div>
    );
}
