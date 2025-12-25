import Link from "next/link";

export default function HomePage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="text-3xl font-bold">
                OU Green Campus
            </h1>
            <p className="mt-2 text-gray-600">
                Nền tảng quản lý hoạt động xanh
            </p>

            <div className="mt-6 flex gap-4">
                <Link
                    href="/login"
                    className="rounded bg-green-600 px-4 py-2 text-white"
                >
                    Đăng nhập
                </Link>
                <Link
                    href="/register"
                    className="rounded border px-4 py-2"
                >
                    Đăng ký
                </Link>
            </div>
        </main>
    );
}
