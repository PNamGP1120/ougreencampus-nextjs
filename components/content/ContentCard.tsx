import Link from "next/link";
import type { Content } from "@/types/content";
import {DEFAULT_CONTENT_IMAGE} from "@/constants/image";

export default function ContentCard({
                                        content,
                                    }: {
    content: Content;
}) {
    const image = content.image || DEFAULT_CONTENT_IMAGE;

    return (
        <div className="overflow-hidden rounded border bg-white shadow-sm">
            <img
                src={image}
                alt={content.title}
                className="h-48 w-full object-cover"
            />

            <div className="p-4">
                <h3 className="text-lg font-semibold line-clamp-2">
                    {content.title}
                </h3>

                <Link
                    href={`/contents/${content.id}`}
                    className="mt-2 inline-block text-green-600"
                >
                    Xem chi tiết →
                </Link>
            </div>
        </div>
    );
}
