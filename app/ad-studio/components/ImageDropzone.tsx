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
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-neutral-200">
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
        className={`border-2 border-dashed rounded-2xl p-3 md:p-4 min-h-[160px] text-center transition-all bg-neutral-950/40 flex flex-col items-center justify-center gap-2 group cursor-pointer relative overflow-hidden ${
          isDragOver
            ? "border-purple-500 bg-purple-950/20"
            : "border-neutral-700/70 hover:border-purple-500/50"
        }`}
      >
        {productImagePreview ? (
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-purple-500/50 shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={productImagePreview}
                alt="Product preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-purple-300 font-medium truncate max-w-[180px]">
                {imageName}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClearImage();
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="text-[11px] text-red-400 hover:text-red-300 underline bg-red-950/40 px-2 py-0.5 rounded border border-red-900/40"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="w-10 h-10 rounded-xl bg-purple-950/50 border border-purple-800/40 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-300">
                Drag & drop product photo, or{" "}
                <span className="text-purple-400 underline">browse</span>
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5">PNG, JPG, or WEBP up to 10MB</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
