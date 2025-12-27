// lib/cookies.ts

/**
 * Set cookie (client-side only)
 */
export function setCookie(
    name: string,
    value: string,
    days = 7
) {
    if (typeof window === "undefined") return;

    const expires = new Date();
    expires.setDate(expires.getDate() + days);

    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
}

/**
 * Get cookie (client-side only)
 */
export function getCookie(name: string): string | null {
    if (typeof window === "undefined") return null;

    const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
}

/**
 * ✅ DELETE COOKIE (FIX BUILD ERROR)
 */
export function deleteCookie(name: string) {
    if (typeof window === "undefined") return;

    document.cookie = `${name}=; Max-Age=0; path=/`;
}
