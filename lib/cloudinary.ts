export async function uploadToCloudinary(file: File): Promise<string> {
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloud || !preset) {
        throw new Error("Missing Cloudinary env config");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!res.ok) {
        const err = await res.text();
        console.error("Cloudinary error:", err);
        throw new Error("Upload failed");
    }

    const data = await res.json();
    return data.secure_url;
}
