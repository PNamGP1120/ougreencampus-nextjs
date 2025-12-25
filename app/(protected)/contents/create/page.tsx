"use client";

import { useRequireRole } from "@/hooks/useRequireRole";
import CreateContentForm from "@/components/content/CreateContentForm";

export default function CreateContentPage() {
    useRequireRole(["admin", "organizer"]);

    return (
        <div className="mx-auto max-w-3xl py-8">
            <CreateContentForm />
        </div>
    );
}
