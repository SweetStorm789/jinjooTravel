import { Router } from 'express';
import multer from 'multer';
import {
  getGalleryList,
  getGalleryDetail,
  createGalleryPost,
  updateGalleryPost,
  deleteGalleryPost,
  getGalleryCategories
} from '../controllers/galleryController';

const router = Router();

// Multer 설정 (메모리 저장소 사용)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB 제한 (개별 파일)
    files: 10, // 최대 10개 파일
  },
  fileFilter: (req, file, cb) => {
    // 이미지 파일만 허용
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('이미지 파일만 업로드 가능합니다.'));
    }
  }
});

// 포토갤러리 카테고리 목록
router.get('/categories', getGalleryCategories);

// 포토갤러리 목록 조회
router.get('/', getGalleryList);

// 포토갤러리 상세 조회
router.get('/:id', getGalleryDetail);

// 포토갤러리 작성 (다중 이미지 업로드)
router.post('/', upload.array('images', 10), createGalleryPost);

// 포토갤러리 수정 (이미지 업로드 선택)
router.put('/:id', upload.array('images', 10), updateGalleryPost);

// 포토갤러리 삭제
router.delete('/:id', deleteGalleryPost);

export default router;
