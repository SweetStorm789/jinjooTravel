import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  Plus, 
  Calendar, 
  User, 
  Eye,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Pin,
  GripVertical
} from "lucide-react";
import { BASE_URL } from '@/lib/constants';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface MarianMessagesPageProps {
  setCurrentPage: (page: string) => void;
  isAdmin?: boolean;
}

interface BoardPost {
  id: string;
  board_type: string;
  title: string;
  content_html: string;
  content_text: string;
  author_name: string;
  status: string;
  is_featured: boolean;
  is_notice: boolean;
  is_pinned: boolean; // 고정 게시글 여부
  display_order: number; // 표시 순서
  view_count: number;
  like_count: number;
  comment_count: number;
  published_at: string;
  created_at: string;
  updated_at: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// 날짜 포맷팅 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 상대적 시간 표시 함수
const getRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return '방금 전';
  if (diffInHours < 24) return `${diffInHours}시간 전`;
  if (diffInHours < 48) return '어제';
  if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}일 전`;
  
  return formatDate(dateString);
};

// 드래그 앤 드롭 가능한 게시글 아이템 컴포넌트
interface SortablePostItemProps {
  post: BoardPost;
  isAdmin: boolean;
  onTogglePin: (postId: string) => void;
  onClick: () => void;
}

function SortablePostItem({ post, isAdmin, onTogglePin, onClick }: SortablePostItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: post.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer" onClick={onClick}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                {post.is_pinned && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    <Pin className="h-3 w-3 mr-1" />
                    고정
                  </Badge>
                )}
                {post.is_featured && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    추천
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  성모님 메시지
                </Badge>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#FF9933] transition-colors mb-2">
                {post.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {post.content_text?.substring(0, 100) + '...'}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author_name}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {getRelativeTime(post.published_at || post.created_at)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>조회 {post.view_count}</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            
            {isAdmin && (
              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTogglePin(post.id);
                  }}
                  className={`p-2 rounded-md transition-colors ${
                    post.is_pinned 
                      ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={post.is_pinned ? '고정 해제' : '고정하기'}
                >
                  <Pin className="h-4 w-4" />
                </button>
                <div
                  {...attributes}
                  {...listeners}
                  className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-grab active:cursor-grabbing"
                  title="드래그하여 순서 변경"
                >
                  <GripVertical className="h-4 w-4" />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function MarianMessagesPageNew({ setCurrentPage, isAdmin = false }: MarianMessagesPageProps) {
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  // 드래그 앤 드롭 센서 설정
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 드래그 앤 드롭 핸들러
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = posts.findIndex((post) => post.id === active.id);
      const newIndex = posts.findIndex((post) => post.id === over?.id);

      const newPosts = arrayMove(posts, oldIndex, newIndex);
      setPosts(newPosts);

      // 서버에 순서 업데이트 요청
      try {
        const updatePromises = newPosts.map((post, index) => 
          fetch(`${BASE_URL}/api/board/${post.id}/order`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              display_order: index + 1,
            }),
          })
        );

        await Promise.all(updatePromises);
      } catch (error) {
        console.error('순서 업데이트 실패:', error);
        // 실패 시 원래 순서로 복원
        fetchPosts();
      }
    }
  };

  // 고정 게시글 토글 핸들러
  const handleTogglePin = async (postId: string) => {
    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      const response = await fetch(`${BASE_URL}/api/board/${postId}/pin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_pinned: !post.is_pinned,
        }),
      });

      if (response.ok) {
        // 로컬 상태 업데이트
        setPosts(posts.map(p => 
          p.id === postId ? { ...p, is_pinned: !p.is_pinned } : p
        ));
      }
    } catch (error) {
      console.error('고정 상태 업데이트 실패:', error);
    }
  };

  // 성모님 메시지 목록 가져오기
  const fetchPosts = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        board_type: 'marian_message',
        status: 'published',
        page: page.toString(),
        limit: limit.toString(),
        sort: 'published_at',
        order: 'DESC'
      });

      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await fetch(`${BASE_URL}/api/board?${params}`);
      if (!response.ok) {
        throw new Error('성모님 메시지를 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      if (data.success) {
        setPosts(data.data || []);
        
        if (data.pagination) {
          setPagination(data.pagination);
        } else {
          // 서버에서 페이지네이션 정보가 없는 경우 클라이언트에서 처리
          const totalItems = data.data?.length || 0;
          const totalPages = Math.ceil(totalItems / limit);
          setPagination({
            currentPage: page,
            totalPages,
            totalItems,
            itemsPerPage: limit
          });
        }
      } else {
        setError(data.message || '성모님 메시지를 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('성모님 메시지 로드 실패:', error);
      setError('서버와의 연결에 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: page }));
      fetchPosts(page, pagination.itemsPerPage);
      // 페이지 상단으로 스크롤
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 검색 핸들러
  const handleSearch = () => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    fetchPosts(1, pagination.itemsPerPage);
  };

  // 엔터 키 핸들러
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchPosts();
  }, []);

  // 로딩 중인 경우
  if (loading && posts.length === 0) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-muted-foreground">성모님 메시지를 불러오는 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            성모님 메시지
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            평화의 모후 메주고리예에서 전해주시는 성모님의 사랑과 평화의 메시지를 전해드립니다.
          </p>
        </div>

        {/* 검색 및 필터 */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Input
                placeholder="메시지 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full sm:w-64"
              />
              <Button onClick={handleSearch}>검색</Button>
            </div>
            
            <div className="flex gap-2">
              {isAdmin && (
                <Button 
                  onClick={() => setCurrentPage("marian-message-form")}
                  className="flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>새 메시지 등록</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* 상단 정보 */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">
            전체 {pagination.totalItems}개의 메시지
          </h2>
        </div>

        {/* 에러 상태 */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* 메시지 목록 */}
        {posts.length === 0 && !loading ? (
          <div className="text-center py-16">
            <div className="text-muted-foreground mb-4">아직 등록된 성모님 메시지가 없습니다.</div>
            {isAdmin && (
              <Button onClick={() => setCurrentPage("marian-message-form")}>
                첫 번째 메시지 등록하기
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* 고정 게시글 */}
            {posts.filter(post => post.is_pinned).length > 0 && (
              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Pin className="h-5 w-5 mr-2 text-yellow-600" />
                  고정 메시지
                </h3>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext items={posts.filter(post => post.is_pinned).map(post => post.id)} strategy={verticalListSortingStrategy}>
                    {posts.filter(post => post.is_pinned).map((post) => (
                      <SortablePostItem
                        key={post.id}
                        post={post}
                        isAdmin={isAdmin}
                        onTogglePin={handleTogglePin}
                        onClick={() => setCurrentPage(`marian-message-detail-${post.id}`)}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            )}

            {/* 일반 게시글 */}
            {posts.filter(post => !post.is_pinned).length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">일반 메시지</h3>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext items={posts.filter(post => !post.is_pinned).map(post => post.id)} strategy={verticalListSortingStrategy}>
                    {posts.filter(post => !post.is_pinned).map((post) => (
                      <SortablePostItem
                        key={post.id}
                        post={post}
                        isAdmin={isAdmin}
                        onTogglePin={handleTogglePin}
                        onClick={() => setCurrentPage(`marian-message-detail-${post.id}`)}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            )}
          </>
        )}

        {/* 페이지네이션 */}
        {pagination.totalItems > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-2">
              {/* 이전 페이지 버튼 */}
              {pagination.totalPages > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.currentPage === 1}
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  className="flex items-center space-x-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>이전</span>
                </Button>
              )}

              {/* 페이지 번호들 */}
              <div className="flex items-center space-x-1">
                {(() => {
                  const pages: any[] = [];
                  const maxVisiblePages = 5;
                  let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
                  let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

                  if (endPage - startPage + 1 < maxVisiblePages) {
                    startPage = Math.max(1, endPage - maxVisiblePages + 1);
                  }

                  if (startPage > 1) {
                    pages.push(
                      <Button
                        key={1}
                        variant={1 === pagination.currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(1)}
                        className="min-w-[40px]"
                      >
                        1
                      </Button>
                    );
                    if (startPage > 2) {
                      pages.push(<span key="ellipsis1" className="px-2 text-muted-foreground">...</span>);
                    }
                  }

                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <Button
                        key={i}
                        variant={i === pagination.currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(i)}
                        className="min-w-[40px]"
                      >
                        {i}
                      </Button>
                    );
                  }

                  if (endPage < pagination.totalPages) {
                    if (endPage < pagination.totalPages - 1) {
                      pages.push(<span key="ellipsis2" className="px-2 text-muted-foreground">...</span>);
                    }
                    pages.push(
                      <Button
                        key={pagination.totalPages}
                        variant={pagination.totalPages === pagination.currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pagination.totalPages)}
                        className="min-w-[40px]"
                      >
                        {pagination.totalPages}
                      </Button>
                    );
                  }

                  return pages;
                })()}
              </div>

              {/* 다음 페이지 버튼 */}
              {pagination.totalPages > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.currentPage === pagination.totalPages}
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  className="flex items-center space-x-1"
                >
                  <span>다음</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
