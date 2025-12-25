"use client";

import { useRequireRole } from "@/hooks/useRequireRole";

export default function OrganizerPage() {
    const { user, loading } = useRequireRole([
        "organizer",
        "admin",
    ]);

    if (loading) return <p>Loading...</p>;
    if (!user) return null;

    return (
        <div className="rounded bg-white p-6 shadow">
            <h1 className="text-2xl font-semibold">
                Organizer Area
            </h1>
            <p className="mt-2 text-gray-600">
                Quản lý hoạt động & sự kiện
            </p>
        </div>
    );
}
