import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }

  // MySQL 에러 처리
  if (err.message.includes('ER_DUP_ENTRY')) {
    return res.status(400).json({
      status: 'fail',
      message: '이미 존재하는 데이터입니다.'
    });
  }

  if (err.message.includes('ER_NO_REFERENCED_ROW')) {
    return res.status(400).json({
      status: 'fail',
      message: '참조하는 데이터가 존재하지 않습니다.'
    });
  }

  // 기본 에러 응답
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'development' 
      ? err.message 
      : '서버에서 오류가 발생했습니다.'
  });
};
