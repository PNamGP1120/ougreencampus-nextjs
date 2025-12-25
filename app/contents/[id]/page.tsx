import Navbar from "@/components/common/Navbar";
import Footer from "@/components/layout/Footer";
import { getContentServer } from "@/lib/contents.server";
import { DEFAULT_CONTENT_IMAGE } from "@/constants/image";


export default async function ContentDetailPage({
                                                    params,
                                                }: {
    params: Promise<{ id: string }>;
}) {
    // ✅ UNWRAP params (Next.js 15+)
    const { id } = await params;
    const contentId = Number(id);

    if (isNaN(contentId)) {
        return (
            <>
                <Navbar />
                <p className="p-10 text-center text-gray-500">
                    Bài viết không tồn tại
                </p>
                <Footer />
            </>
        );
    }

    let content;
    try {
        content = await getContentServer(contentId);
    } catch {
        return (
            <>
                <Navbar />
                <p className="p-10 text-center text-gray-500">
                    Bài viết không tồn tại
                </p>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            {/* ===== MAIN ===== */}
            <main className="mx-auto max-w-4xl px-4 py-10">
                {/* ===== TITLE ===== */}
                <h1 className="mb-4 text-3xl font-bold leading-tight text-green-900">
                    {content.title}
                </h1>

                {/* ===== META INFO ===== */}
                <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span>
            📅{" "}
              {content.created_at
                  ? new Date(content.created_at).toLocaleDateString("vi-VN")
                  : "Chưa rõ ngày đăng"}
          </span>

                    {content.author?.name && (
                        <span>✍️ {content.author.name}</span>
                    )}

                    {content.category?.name && (
                        <span className="rounded bg-green-100 px-2 py-0.5 text-green-700">
              {content.category.name}
            </span>
                    )}
                </div>

                {/* ===== TAGS ===== */}
                {content.tags && content.tags.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2">
                        {content.tags.map((tag: any) => (
                            <span
                                key={tag.id}
                                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                            >
                #{tag.name}
              </span>
                        ))}
                    </div>
                )}

                {/* ===== COVER IMAGE ===== */}
                <div className="mb-8">
                    <img
                        src={content.image || DEFAULT_CONTENT_IMAGE}
                        alt={content.title}
                        className="h-[360px] w-full rounded-lg object-cover shadow"
                    />
                </div>

                {/* ===== CONTENT BODY ===== */}
                <article
                    className="prose prose-green max-w-none text-justify"
                    dangerouslySetInnerHTML={{
                        __html: content.body || "",
                    }}
                />

                {/* ===== DIVIDER ===== */}
                <hr className="my-10 border-gray-200" />

                {/* ===== EXTRA INFO ===== */}
                <section className="rounded-lg bg-green-50 p-6">
                    <h2 className="mb-2 text-lg font-semibold text-green-800">
                        🌱 Chung tay bảo vệ môi trường
                    </h2>
                    <p className="text-gray-700">
                        Mỗi hành động nhỏ hôm nay sẽ góp phần tạo nên một tương lai
                        bền vững cho cộng đồng và thế hệ mai sau. Hãy cùng OU Green
                        Campus lan toả lối sống xanh.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                        <a
                            href="/contents"
                            className="rounded border border-green-700 px-4 py-2 text-sm text-green-700 hover:bg-green-700 hover:text-white"
                        >
                            ← Quay lại danh sách bài viết
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
