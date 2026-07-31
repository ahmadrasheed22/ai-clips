"use client";

import React, { useRef, useState } from "react";

interface ImageDropzoneProps {
  imagePreviews: string[];
  imageNames: string[];
  onImagesSelect: (files: File[]) => void;
  onRemoveImage: (index: number) => void;
  onClearAll: () => void;
}

export function ImageDropzone({
  imagePreviews,
  imageNames,
  onImagesSelect,
  onRemoveImage,
  onClearAll,
}: ImageDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const processFiles = (files: FileList | File[]) => {
    const validImages = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (validImages.length > 0) {
      onImagesSelect(validImages);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
      e.target.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
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

  const hasImages = imagePreviews.length > 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-extrabold text-stone-950 uppercase tracking-wider">
          1. Upload Product Photos (Multi-Angle)
        </label>
        {hasImages && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-orange-950 bg-orange-600/15 px-2.5 py-0.5 rounded-full border border-orange-600/30 font-bold">
              📷 {imagePreviews.length} {imagePreviews.length === 1 ? "Angle" : "Angles"}
            </span>
            <button
              type="button"
              onClick={onClearAll}
              className="text-[10px] text-red-700 hover:text-red-900 underline font-bold"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
        id="product-image-upload"
      />

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border border-dashed rounded-xl p-3.5 min-h-[140px] text-center transition-all bg-white/40 backdrop-blur-md flex flex-col items-center justify-center gap-2 relative overflow-hidden ${
          isDragOver
            ? "border-orange-600 bg-orange-500/20 shadow-md"
            : "border-stone-900/25 hover:border-orange-600/60 hover:bg-white/60"
        }`}
      >
        {hasImages ? (
          <div className="w-full space-y-2.5">
            {/* Grid of Thumbnails */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="relative group rounded-lg overflow-hidden border border-white/80 shadow-md aspect-square bg-stone-900"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt={`Product angle ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-stone-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveImage(index);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow-md text-[10px] font-bold"
                      title="Remove image"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <span className="absolute bottom-1 left-1 bg-stone-950/80 backdrop-blur-xs text-[9px] text-amber-200 px-1.5 py-0.5 rounded font-mono truncate max-w-[90%] font-semibold">
                    {imageNames[index] || `Angle ${index + 1}`}
                  </span>
                </div>
              ))}

              {/* Add More Button inside grid */}
              {imagePreviews.length < 9 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-1 border border-dashed border-orange-600/50 hover:border-orange-600 rounded-lg aspect-square bg-orange-600/10 hover:bg-orange-600/20 text-orange-950 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-[10px] font-bold">Add Angle</span>
                </button>
              )}
            </div>

            <p className="text-[10px] text-stone-700 font-medium">
              Drag & drop more product photos or click above to add reference angles (up to 9).
            </p>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-2 cursor-pointer w-full h-full py-3"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-600/15 border border-orange-600/30 flex items-center justify-center text-orange-950 shadow-xs group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">
                Drag & drop product photos (front, back, details), or{" "}
                <span className="text-orange-950 underline font-extrabold">browse</span>
              </p>
              <p className="text-[10px] text-stone-700 font-medium mt-0.5">
                Upload up to 9 product reference angles (PNG, JPG, WEBP)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
