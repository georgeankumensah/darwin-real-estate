import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export function uploadToCloudinary(
    file: File,
    options?: {
        resourceType?: 'image' | 'video';
        folder?: string;
        public_id?: string;
    }
): Promise<{ secure_url: string; public_id: string }> {
    return new Promise(async (resolve, reject) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const resource_type = options?.resourceType || "auto";

        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type,
                folder: options?.folder || undefined,
                public_id: options?.public_id || undefined,
            },
            (error, result) => {
                if (error || !result) return reject(error);
                resolve({
                    secure_url: result.secure_url,
                    public_id: result.public_id,
                });
            }
        );

        stream.end(buffer);
    });
}

export function deleteFromCloudinary(publicId: string, resourceType: 'image' | 'video' = 'image') {
    return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}
