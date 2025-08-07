import React, { useCallback } from 'react';
import { Button } from './button';
import { X } from 'lucide-react';

interface ImageUploadProps {
  images: { id?: number; image_url: string; display_order: number }[];
  onUpload: (files: FileList) => void;
  onRemove: (index: number) => void;
  onReorder: (dragIndex: number, hoverIndex: number) => void;
  maxFiles?: number;
  className?: string;
}

export function ImageUpload({
  images,
  onUpload,
  onRemove,
  onReorder,
  maxFiles = 10,
  className = ''
}: ImageUploadProps) {
  const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (dragIndex !== dropIndex) {
      onReorder(dragIndex, dropIndex);
    }
  }, [onReorder]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(e.target.files);
    }
  }, [onUpload]);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={image.id || index}
            className="relative aspect-square border rounded-lg overflow-hidden"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <img
              src={image.image_url}
              alt={`Uploaded image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => onRemove(index)}
              className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/80 rounded-full text-sm">
              {index + 1}
            </div>
          </div>
        ))}
        {images.length < maxFiles && (
          <label className="relative aspect-square border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-primary">
            <div className="text-center">
              <div className="mt-2">이미지 추가</div>
              <div className="text-sm text-gray-500">
                (최대 {maxFiles}개)
              </div>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
      <div className="text-sm text-gray-500">
        * 드래그하여 이미지 순서를 변경할 수 있습니다.
      </div>
    </div>
  );
}