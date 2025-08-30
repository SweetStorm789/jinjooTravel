"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? ['https://your-production-domain.com'] // 프로덕션 환경의 도메인으로 수정 필요
        : ['http://localhost:3000', 'http://localhost:5173'], // 개발 환경의 프론트엔드 포트
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400 // 24시간
};
exports.default = corsOptions;
