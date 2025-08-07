import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

interface ProcessedImage {
  filename: string;
  path: string;
  width: number;
  height: number;
}

export const processImage = async (
  file: Express.Multer.File,
  options: {
    width?: number;
    height?: number;
    quality?: number;
  } = {}
): Promise<ProcessedImage> => {
  const {
    width = 1920,  // 기본 최대 너비
    height = 1080, // 기본 최대 높이
    quality = 80   // 기본 품질
  } = options;

  // 업로드 디렉토리 설정
  const uploadDir = path.join(__dirname, '../../uploads');
  
  // 디렉토리가 없으면 생성
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }

  // 파일명 생성 (UUID + 원본 확장자)
  const ext = path.extname(file.originalname).toLowerCase();
  const filename = `${uuidv4()}${ext}`;
  const outputPath = path.join(uploadDir, filename);

  // 이미지 처리
  const image = sharp(file.buffer);
  const metadata = await image.metadata();

  // 원본 이미지의 가로/세로 비율 유지하면서 리사이징
  if (metadata.width && metadata.height) {
    const aspectRatio = metadata.width / metadata.height;
    
    if (width / height > aspectRatio) {
      // 높이에 맞춤
      await image
        .resize({ height, fit: 'contain' })
        .jpeg({ quality })
        .toFile(outputPath);
    } else {
      // 너비에 맞춤
      await image
        .resize({ width, fit: 'contain' })
        .jpeg({ quality })
        .toFile(outputPath);
    }
  }

  const processedMetadata = await sharp(outputPath).metadata();

  return {
    filename,
    path: `/uploads/${filename}`,
    width: processedMetadata.width || 0,
    height: processedMetadata.height || 0
  };
};
