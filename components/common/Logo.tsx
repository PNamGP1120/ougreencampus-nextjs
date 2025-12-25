"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

interface LogoProps {
    size?: number;          // kích thước logo (px)
    showText?: boolean;     // có hiện chữ OU Green Campus không
    textSize?: string;      // class size chữ
    href?: string;          // link khi click
}

export default function Logo({
                                 size = 40,
                                 showText = true,
                                 textSize = "text-lg",
                                 href = "/",
                             }: LogoProps) {
    const content = (
        <div className="flex items-center gap-2">
            <Image
                src="/logo-ou-green.jpg"
                alt="OU Green Campus"
                width={size}
                height={size}
                priority
            />
            {showText && (
                <span
                    className={clsx(
                        "font-semibold text-green-700",
                        textSize
                    )}
                >
          OU Green Campus
        </span>
            )}
        </div>
    );

    return href ? <Link href={href}>{content}</Link> : content;
}
