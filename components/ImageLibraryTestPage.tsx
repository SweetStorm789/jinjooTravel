import React, { useState } from 'react';
import { Button } from './ui/button';
import ImageLibraryModal from './ImageLibraryModal';

interface ImageLibraryImage {
  id: number;
  filename: string;
  original_name: string;
  url: string;
  thumbnail_url: string;
  category: string;
  tags: string[];
  usage_count: number;
  created_at: string;
}

export default function ImageLibraryTestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<ImageLibraryImage[]>([]);

  const handleImageSelect = (image: ImageLibraryImage) => {
    setSelectedImages(prev => {
      const isSelected = prev.some(selected => selected.id === image.id);
      if (isSelected) {
        return prev.filter(selected => selected.id !== image.id);
      } else {
        return [...prev, image];
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">이미지 라이브러리 테스트</h1>
        
        <div className="space-y-6">
          {/* 테스트 버튼들 */}
          <div className="flex gap-4">
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              이미지 라이브러리 열기 (단일 선택)
            </Button>
            
            <Button 
              onClick={() => {
                setSelectedImages([]);
                setIsModalOpen(true);
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              이미지 라이브러리 열기 (다중 선택)
            </Button>
          </div>

          {/* 선택된 이미지들 표시 */}
          {selectedImages.length > 0 && (
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">
                선택된 이미지 ({selectedImages.length}개)
              </h2>
                                                           <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {selectedImages.map((image) => (
                                     <div key={image.id} className="flex flex-col items-center p-2 rounded border border-gray-200">
                                           <div className="relative w-24 h-24 mb-1">
                       <img
                         src={image.thumbnail_url || image.url}
                         alt={image.original_name}
                                                   className="w-full h-full object-contain rounded border border-gray-200 bg-gray-50 opacity-0 transition-opacity duration-200"
                                                   onLoad={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.style.opacity = '1';
                          }}
                          onError={(e) => {
                            console.error('Image load failed:', image.url);
                            const img = e.target as HTMLImageElement;
                            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xOSAyMEg0NVY0NEgxOVYyMFoiIGZpbGw9IiNEN0Q5RDEiLz4KPC9zdmc+';
                            img.style.opacity = '1';
                          }}
                       />
                     </div>
                                           {/* 파일명 숨김 */}
                   </div>
                ))}
              </div>
            </div>
          )}

          {/* 선택된 이미지 정보 */}
          {selectedImages.length > 0 && (
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">선택된 이미지 정보</h2>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(selectedImages, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* 이미지 라이브러리 모달 */}
        <ImageLibraryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelectImage={handleImageSelect}
          selectedImages={selectedImages}
          multiple={true}
        />
      </div>
    </div>
  );
}
