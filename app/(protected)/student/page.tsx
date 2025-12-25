"use client";

import { useRequireRole } from "@/hooks/useRequireRole";

export default function StudentPage() {
    const { user, loading } = useRequireRole([
        "student",
        "admin",
    ]);

    if (loading) return <p>Loading...</p>;
    if (!user) return null;

    return (
        <div className="rounded bg-white p-6 shadow">
            <h1 className="text-2xl font-semibold">
                Student Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
                Tham gia hoạt động xanh
            </p>
        </div>
    );
}
