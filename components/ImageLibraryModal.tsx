import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { X, Check } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '@/lib/constants';

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

interface ImageLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (image: ImageLibraryImage) => void;
  onSelectMultipleImages?: (images: ImageLibraryImage[]) => void;
  selectedImages?: ImageLibraryImage[];
  multiple?: boolean;
}

export default function ImageLibraryModal({
  isOpen,
  onClose,
  onSelectImage,
  onSelectMultipleImages,
  selectedImages = [],
  multiple = false
}: ImageLibraryModalProps) {
  const [images, setImages] = useState<ImageLibraryImage[]>([]);
  const [loading, setLoading] = useState(false);

  // 다중 선택 모드에서 내부적으로 선택된 이미지들 관리
  const [internalSelectedImages, setInternalSelectedImages] = useState<ImageLibraryImage[]>([]);

  // 이미지 라이브러리 조회
  const fetchImages = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: '1000' // 모든 이미지를 한 번에 로드
      });

      const response = await axios.get(`${BASE_URL}/api/image-library?${params}`);
      const data = response.data;

      // 중복 이미지 제거 (ID 기준)
      const uniqueImages = (data.images || []).filter((image: any, index: number, self: any[]) =>
        index === self.findIndex((img: any) => img.id === image.id)
      );

      // 이미 선택된 이미지들 제외 (URL 기준으로 비교)
      const selectedImageUrls = selectedImages.map(img => img.url);
      const filteredImages = uniqueImages.filter((image: any) =>
        !selectedImageUrls.includes(image.url)
      );

      setImages(filteredImages);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchImages();
      // 모달이 열릴 때 내부 선택 상태 초기화
      setInternalSelectedImages([]);
    }
  }, [isOpen]);

  const handleImageSelect = (image: ImageLibraryImage) => {
    if (multiple) {
      // 다중 선택 모드 - 내부적으로 선택 상태 관리
      const isSelected = internalSelectedImages.some(selected => selected.id === image.id);
      if (isSelected) {
        // 이미 선택된 이미지면 제거
        setInternalSelectedImages(prev => prev.filter(selected => selected.id !== image.id));
      } else {
        // 새로운 이미지 선택
        setInternalSelectedImages(prev => [...prev, image]);
      }
    } else {
      // 단일 선택 모드
      onSelectImage(image);
      onClose();
    }
  };

  const isImageSelected = (image: ImageLibraryImage) => {
    if (multiple) {
      return internalSelectedImages.some(selected => selected.id === image.id);
    }
    return selectedImages.some(selected => selected.id === image.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>이미지 라이브러리</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            이미지를 선택하여 사용하세요. {multiple ? '여러 이미지를 선택할 수 있습니다.' : '하나의 이미지를 선택하세요.'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* 이미지 그리드 - 탐색기 스타일 */}
          <div className="flex-1 overflow-y-auto min-h-[500px] max-h-[600px]">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-gray-500">로딩 중...</div>
              </div>
            ) : images.length === 0 ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-gray-500">이미지가 없습니다.</div>
              </div>
            ) : (
              // ① 행높이 고정: auto-rows-[140px] (파일명 한 줄 + 썸네일)
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 gap-4 p-4">
                {images.map((image) => (
                  <button
                    type="button"
                    key={`image-${image.id}-${image.filename}`}
                    onClick={() => handleImageSelect(image)}
                    // ③ 카드에 overflow-hidden / focus/hover 스타일
                    className={`group relative flex flex-col rounded-lg border border-gray-200 bg-white overflow-hidden transition ring-offset-2 hover:ring-2 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isImageSelected(image) ? 'ring-2 ring-blue-500' : ''
                      }`}
                  >
                    {/* ② 썸네일: aspect-square 로 셀 너비에 맞춰 정사각형 */}
                    <div className="relative w-full aspect-square">
                      <img
                        src={image.thumbnail_url || image.url}
                        alt={image.original_name}
                        className="absolute inset-0 w-full h-full object-cover bg-gray-50 opacity-0 transition-opacity duration-200"
                        onLoad={(e) => {
                          (e.target as HTMLImageElement).style.opacity = '1';
                          // console.log('Image loaded successfully:', {
                          //   url: image.url,
                          //   filename: image.filename,
                          //   original_name: image.original_name
                          // });
                        }}
                        onError={(e) => {
                          console.error('Image load failed:', {
                            url: image.url,
                            thumbnail_url: image.thumbnail_url,
                            filename: image.filename,
                            original_name: image.original_name
                          });
                          (e.target as HTMLImageElement).src =
                            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNMTkgMjBINDVWNDRIMSkgRmlsbD0iI0Q3RDlEMSIvPjwvc3ZnPg==';
                        }}
                      />
                      {isImageSelected(image) && (
                        <div className="absolute bottom-1 right-1 bg-green-500 text-white rounded-full p-0.5 pointer-events-none">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    {/* 파일명 숨김 */}
                  </button>
                ))}
              </div>
            )}
          </div>



          {/* 다중 선택 모드에서 선택된 이미지 표시 */}
          {multiple && internalSelectedImages.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="text-sm font-medium mb-2">
                선택된 이미지 ({internalSelectedImages.length}개)
              </div>
              <div className="flex flex-wrap gap-2">
                {internalSelectedImages.map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.thumbnail_url || image.url}
                      alt={image.original_name}
                      className="w-12 h-12 object-cover rounded border"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white hover:bg-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageSelect(image);
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => {
                    if (onSelectMultipleImages) {
                      onSelectMultipleImages(internalSelectedImages);
                    } else {
                      onSelectImage(internalSelectedImages[0]); // 첫 번째 이미지만 전달 (임시)
                    }
                    onClose();
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  선택 완료 ({internalSelectedImages.length}개)
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
