import express from 'express';
import pool from '../config/database';

const router = express.Router();

router.get('/health', async (req, res) => {
  try {
    // 데이터베이스 연결 테스트
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();

    res.json({
      status: 'ok',
      message: 'Server is healthy',
      database: 'connected'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server is running but database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
