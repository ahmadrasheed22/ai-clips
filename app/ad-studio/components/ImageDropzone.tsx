"use client";

import React, { useRef, useState } from "react";

interface ImageDropzoneProps {
  productImagePreview: string | null;
  imageName: string | null;
  onImageSelect: (file: File) => void;
  onClearImage: () => void;
}

export function ImageDropzone({
  productImagePreview,
  imageName,
  onImageSelect,
  onClearImage,
}: ImageDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onImageSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-neutral-200">
        1. Upload Product Photo
      </label>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="product-image-upload"
      />
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-2xl p-6 md:p-8 text-center transition-all bg-neutral-950/40 flex flex-col items-center justify-center gap-3 group cursor-pointer relative overflow-hidden ${
          isDragOver
            ? "border-purple-500 bg-purple-950/20"
            : "border-neutral-700/70 hover:border-purple-500/50"
        }`}
      >
        {productImagePreview ? (
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-36 h-36 rounded-xl overflow-hidden border border-purple-500/50 shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={productImagePreview}
                alt="Product preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-purple-300 font-medium truncate max-w-[200px]">
                {imageName}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClearImage();
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="text-xs text-red-400 hover:text-red-300 underline bg-red-950/40 px-2.5 py-1 rounded border border-red-900/40"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-purple-950/50 border border-purple-800/40 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-300">
                Drag and drop product image here, or{" "}
                <span className="text-purple-400 underline">browse</span>
              </p>
              <p className="text-xs text-neutral-500 mt-1">PNG, JPG, or WEBP up to 10MB</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
