"use client";

import Link from "next/link";
import {DEFAULT_IMAGE} from "@/constants/image";
import {useRouter} from "next/navigation";
import {useState, useRef, useEffect} from "react";
import {useAuth} from "@/hooks/useAuth";
import {deleteCookie} from "@/lib/cookies";
import Image from "next/image";

const COOKIE_NAME = "ogc_token";

export default function Navbar() {
    const router = useRouter();
    const {user, loading} = useAuth();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const logout = () => {
        deleteCookie(COOKIE_NAME);
        localStorage.removeItem("token");
        router.push("/login");
        router.refresh();
    };

    // close dropdown when click outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <header className="border-b bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* LOGO */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-bold text-green-800"
                    >

                        <Image src={DEFAULT_IMAGE}
                               alt="OU Green Campus"
                               width={48}
                               height={48}
                        />
                        <span className="text-lg">OU Green Campus</span>
                    </Link>

                    {/* NAVIGATION */}
                    <nav className="flex items-center gap-6 font-semibold text-green-800">
                        <Link href="/contents" className="hover:text-green-600">
                            Bài viết
                        </Link>
                        <Link href="/events" className="hover:text-green-600">
                            Sự kiện
                        </Link>
                        <Link href="/activities" className="hover:text-green-600">
                            Hoạt động
                        </Link>

                        {!loading && user && (
                            <>
                                <Link href="/dashboard" className="hover:text-green-600">
                                    Dashboard
                                </Link>

                                {(user.role === "admin" ||
                                    user.role === "organizer") && (
                                    <Link
                                        href="/contents/create"
                                        className="hover:text-green-600"
                                    >
                                        Đăng bài
                                    </Link>
                                )}

                                {user.role === "admin" && (
                                    <Link href="/admin" className="hover:text-green-600">
                                        Admin
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-4">
                        {loading ? null : user ? (
                            <div className="relative" ref={dropdownRef}>
                                {/* Avatar + Name */}
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100"
                                >
                                    <span className="text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                                    <Image
                                        src={
                                            user.avatar || DEFAULT_IMAGE
                                        }
                                        alt={user.name}
                                        width={32}
                                        height={32}
                                        className="rounded-full object-cover"
                                    />

                                </button>

                                {/* DROPDOWN */}
                                {open && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg">
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            Trang cá nhân
                                        </Link>

                                        <Link
                                            href="/settings"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            Cài đặt
                                        </Link>

                                        <button
                                            onClick={logout}
                                            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                                        >
                                            Đăng xuất
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="rounded px-3 py-1 text-sm font-semibold text-green-800 hover:bg-gray-100"
                                >
                                    Đăng nhập
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded bg-green-700 px-4 py-1 text-sm font-semibold text-white hover:bg-green-800"
                                >
                                    Đăng ký
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
