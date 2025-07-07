"use client";

import {Upload, Video, X, ImageIcon} from "lucide-react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";
import React from "react";
import {UseFormReturn} from "react-hook-form";
import {CreatePropertyInput} from "@/lib/validators/property.validation";

interface MediaUploadProps {
    mediaFiles: File[];
    setMediaFiles: React.Dispatch<React.SetStateAction<File[]>>;
    form: UseFormReturn<CreatePropertyInput>;
}

export function MediaUpload({mediaFiles, setMediaFiles, form}: MediaUploadProps) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const validFiles = files.filter(file => {
            const isValidImage = file.type.startsWith('image/') &&
                ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
            const isValidVideo = file.type.startsWith('video/') &&
                ['video/mp4', 'video/mov', 'video/avi', 'video/wmv', 'video/webm'].includes(file.type);
            const isValidSize = file.size <= 100 * 1024 * 1024; // 100MB limit
            return (isValidImage || isValidVideo) && isValidSize;
        });
        setMediaFiles(prev => [...prev, ...validFiles]);
        form.setValue('media', [...(form.getValues('media') || []), ...validFiles]);
    };

    const removeMediaFile = (index: number) => {
        setMediaFiles(prev => prev.filter((_, i) => i !== index));
        form.setValue('media', form.getValues('media')?.filter((_, i) => i !== index));
    };

    const isVideo = (filename: string): boolean => {
        const videoExtensions = ['.mp4', '.mov', '.avi', '.wmv', '.webm'];
        return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
    };

    const getFilePreview = (file: File): string | null => {
        if (file.type.startsWith('image/')) {
            return URL.createObjectURL(file);
        }
        return null;
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="space-y-4">
            <Label className="text-lg font-semibold">Media Upload</Label>

            {/* Media Preview */}
            {mediaFiles.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-sm font-medium">Selected Files ({mediaFiles.length} items)</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {mediaFiles.map((file, index) => (
                            <div key={index} className="relative group border-2 border-gray-200 rounded-lg overflow-hidden">
                                {isVideo(file.name) ? (
                                    <div className="w-full h-32 bg-gray-100 flex flex-col items-center justify-center">
                                        <Video className="h-8 w-8 text-gray-400 mb-1"/>
                                        <span className="text-xs text-gray-500">
                                            {formatFileSize(file.size)}
                                        </span>
                                    </div>
                                ) : (
                                    <Image
                                        src={getFilePreview(file) || "/placeholder.svg"}
                                        alt={file.name}
                                        width={300}
                                        height={200}
                                        className="w-full h-32 object-cover"
                                    />
                                )}

                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                                    onClick={() => removeMediaFile(index)}
                                >
                                    <X className="h-3 w-3"/>
                                </Button>

                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-2 truncate">
                                    {file.name}
                                </div>

                                {/* File type indicator */}
                                <div className="absolute top-2 left-2">
                                    <Badge variant={isVideo(file.name) ? "default" : "secondary"} className="text-xs">
                                        {isVideo(file.name) ? "VIDEO" : "IMAGE"}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Upload Area */}
            <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <div className="mx-auto flex flex-col items-center justify-center gap-3">
                    <Upload className="h-10 w-10 text-gray-400"/>
                    <div className="text-muted-foreground">
                        <p className="text-lg font-medium">Upload Media Files</p>
                        <p className="text-sm">Drag and drop your images and videos here or click to browse</p>
                        <p className="text-xs mt-1">
                            Supported: JPEG, PNG, WebP, MP4, MOV, AVI, WMV, WebM
                        </p>
                        <p className="text-xs text-gray-500">
                            Max file size: 100MB per file
                        </p>
                    </div>
                    <Input
                        id="media-upload"
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,image/webp,video/mp4,video/mov,video/avi,video/wmv,video/webm"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => document.getElementById('media-upload')?.click()}
                        className="flex items-center gap-2"
                    >
                        <ImageIcon className="h-4 w-4"/>
                        Choose Files
                    </Button>
                </div>
            </div>
        </div>
    );
}
