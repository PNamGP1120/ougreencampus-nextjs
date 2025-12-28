import Link from "next/link";

export default function HomePage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
            <div className="mx-auto max-w-3xl text-center">
                {/* Logo / Title */}
                <h1 className="text-4xl font-extrabold tracking-tight text-green-700 sm:text-5xl">
                    OU Green Campus
                </h1>

                <p className="mt-4 text-lg text-gray-600">
                    Nền tảng quản lý hoạt động xanh, sự kiện và nội dung bền vững
                    dành cho sinh viên và nhà trường.
                </p>

                {/* Actions */}
                <div className="mt-8 flex justify-center gap-4">
                    <Link
                        href="/login"
                        className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow hover:bg-green-700 transition"
                    >
                        Đăng nhập
                    </Link>

                    <Link
                        href="/register"
                        className="rounded-xl border border-green-600 px-6 py-3 font-semibold text-green-700 hover:bg-green-50 transition"
                    >
                        Đăng ký
                    </Link>
                </div>

                {/* Footer note */}
                <p className="mt-10 text-sm text-gray-400">
                    © {new Date().getFullYear()} OU Green Campus
                </p>
            </div>
        </main>
    );
}
