import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export function uploadToCloudinary(file: File): Promise<string> {
    return new Promise(async (resolve, reject) => {
        const buffer = Buffer.from(await file.arrayBuffer());

        const stream = cloudinary.uploader.upload_stream(
            {resource_type: "image"},
            (error, result) => {
                if (error || !result) return reject(error);
                resolve(result.secure_url);
            }
        );

        stream.end(buffer);
    });
}

export function deleteFromCloudinary(publicId: string) {
    return cloudinary.uploader.destroy(publicId);
}