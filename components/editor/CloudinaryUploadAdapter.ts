import { uploadToCloudinary } from "@/lib/cloudinary";

export default class CloudinaryUploadAdapter {
    loader: any;

    constructor(loader: any) {
        this.loader = loader;
    }

    async upload() {
        const file = await this.loader.file;
        const url = await uploadToCloudinary(file);

        return {
            default: url,
        };
    }

    abort() {}
}
