import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Upload, Trash2, RefreshCw } from 'lucide-react';
import ImageLibraryModal from './ImageLibraryModal';
import { BASE_URL } from '../src/lib/constants';

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
  const [allImages, setAllImages] = useState<ImageLibraryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // 업로드 관련 상태
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  
  // 검색 상태
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/image-library`);
      if (response.ok) {
        const data = await response.json();
        setAllImages(data.images || []);
      }
    } catch (error) {
      console.error('이미지 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadFiles(files);
  };

  const handleUpload = async () => {
    if (uploadFiles.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      uploadFiles.forEach(file => {
        formData.append('images', file);
      });

      const response = await fetch(`${BASE_URL}/api/image-library/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('이미지 업로드 성공!');
        setUploadFiles([]);
        fetchImages();
      } else {
        const errorData = await response.json();
        alert(`업로드 실패: ${errorData.error || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error('업로드 오류:', error);
      alert('업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!confirm('정말로 이 이미지를 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`${BASE_URL}/api/image-library/${imageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('이미지 삭제 성공!');
        fetchImages();
        setSelectedImages(prev => prev.filter(img => img.id !== imageId));
      } else {
        const errorData = await response.json();
        alert(`삭제 실패: ${errorData.error || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error('삭제 오류:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const filteredImages = allImages.filter(image => {
    const matchesSearch = !searchTerm || 
      image.original_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.filename.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">이미지 라이브러리 관리 테스트</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 이미지 업로드 및 선택 */}
          <div className="space-y-6">
            {/* 이미지 업로드 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  이미지 업로드
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="file-upload">이미지 파일 선택</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="mt-1"
                  />
                                       <div className="mt-2 text-xs text-gray-500">
                       최대 50MB까지 업로드 가능합니다. 큰 이미지는 자동으로 리사이징됩니다.
                     </div>
                  {uploadFiles.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      선택된 파일: {uploadFiles.length}개
                      {uploadFiles.map((file, index) => (
                        <div key={index} className="text-xs text-gray-500 mt-1">
                          {file.name} ({(file.size / 1024 / 1024).toFixed(1)}MB)
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={handleUpload}
                  disabled={uploading || uploadFiles.length === 0}
                  className="w-full"
                >
                  {uploading ? '업로드 중...' : '업로드'}
                </Button>
              </CardContent>
            </Card>

            {/* 이미지 라이브러리 모달 버튼 */}
            <Card>
              <CardHeader>
                <CardTitle>이미지 선택</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    이미지 라이브러리 열기
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      setSelectedImages([]);
                      setIsModalOpen(true);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    새로 선택
                  </Button>
                </div>
                
                {selectedImages.length > 0 && (
                  <div className="text-sm text-gray-600">
                    선택된 이미지: {selectedImages.length}개
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 오른쪽: 이미지 목록 및 관리 */}
          <div className="space-y-6">
            {/* 검색 */}
            <Card>
              <CardHeader>
                <CardTitle>검색</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="search">파일명 검색</Label>
                  <Input
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="파일명으로 검색..."
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* 이미지 목록 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>이미지 목록 ({filteredImages.length}개)</span>
                  <Button 
                    onClick={fetchImages}
                    disabled={loading}
                    variant="outline"
                    size="sm"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">로딩 중...</div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                    {filteredImages.map((image) => (
                      <div key={image.id} className="relative group border rounded-lg p-2">
                        <div className="relative w-full aspect-square mb-2">
                          <img
                            src={image.thumbnail_url || image.url}
                            alt={image.original_name}
                            className="w-full h-full object-cover rounded"
                            onError={(e) => {
                              const img = e.target as HTMLImageElement;
                              img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xOSAyMEg0NVY0NEgxOVYyMFoiIGZpbGw9IiNEN0Q5RDEiLz4KPC9zdmc+';
                            }}
                          />
                        </div>
                        
                        <div className="text-xs text-gray-600 truncate mb-1">
                          {image.original_name}
                        </div>
                        
                        {image.category && (
                          <Badge variant="secondary" className="text-xs mb-1">
                            {image.category}
                          </Badge>
                        )}
                        
                        {/* 삭제 버튼 */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteImage(image.id)}
                            className="w-6 h-6 p-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 선택된 이미지들 표시 */}
        {selectedImages.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>선택된 이미지 ({selectedImages.length}개)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {selectedImages.map((image) => (
                  <div key={image.id} className="flex flex-col items-center p-2 rounded border border-gray-200">
                    <div className="relative w-24 h-24 mb-1">
                      <img
                        src={image.thumbnail_url || image.url}
                        alt={image.original_name}
                        className="w-full h-full object-contain rounded border border-gray-200 bg-gray-50"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xOSAyMEg0NVY0NEgxOVYyMFoiIGZpbGw9IiNEN0Q5RDEiLz4KPC9zdmc+';
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-600 truncate text-center">
                      {image.original_name}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

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
