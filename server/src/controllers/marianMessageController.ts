import { Request, Response } from 'express';
import pool from '../config/database';

// 성모님 메시지 인터페이스
interface MarianMessage {
  id?: number;
  message_date: string;
  content_message: string;
  prayer_priest?: string;
  prayer_intent?: string;
  created_at?: string;
  updated_at?: string;
}

// 모든 성모님 메시지 조회
export const getAllMarianMessages = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        id,
        message_date,
        content_message,
        prayer_priest,
        prayer_intent,
        created_at,
        updated_at
      FROM mary_message 
      ORDER BY message_date DESC
    `);
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('성모님 메시지 목록 조회 에러:', error);
    res.status(500).json({
      success: false,
      message: '성모님 메시지 목록을 가져오는데 실패했습니다.'
    });
  }
};

// 특정 성모님 메시지 조회
export const getMarianMessageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const [rows] = await pool.query(`
      SELECT 
        id,
        message_date,
        content_message,
        prayer_priest,
        prayer_intent,
        created_at,
        updated_at
      FROM mary_message 
      WHERE id = ?
    `, [id]);
    
    if (Array.isArray(rows) && rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: '해당 메시지를 찾을 수 없습니다.'
      });
    }
    
    res.json({
      success: true,
      data: Array.isArray(rows) ? rows[0] : rows
    });
  } catch (error) {
    console.error('성모님 메시지 상세 조회 에러:', error);
    res.status(500).json({
      success: false,
      message: '성모님 메시지를 가져오는데 실패했습니다.'
    });
  }
};

// 성모님 메시지 생성
export const createMarianMessage = async (req: Request, res: Response) => {
  try {
    const { message_date, content_message, prayer_priest, prayer_intent } = req.body;
    
    // 필수 필드 검증
    if (!message_date || !content_message) {
      return res.status(400).json({
        success: false,
        message: '메시지 일자와 내용은 필수입니다.'
      });
    }
    
    const [result] = await pool.query(`
      INSERT INTO mary_message (
        message_date,
        content_message,
        prayer_priest,
        prayer_intent
      ) VALUES (?, ?, ?, ?)
    `, [message_date, content_message, prayer_priest || null, prayer_intent || null]);
    
    res.status(201).json({
      success: true,
      message: '성모님 메시지가 성공적으로 등록되었습니다.',
      data: { id: (result as any).insertId }
    });
  } catch (error) {
    console.error('성모님 메시지 생성 에러:', error);
    res.status(500).json({
      success: false,
      message: '성모님 메시지 등록에 실패했습니다.'
    });
  }
};

// 성모님 메시지 수정
export const updateMarianMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { message_date, content_message, prayer_priest, prayer_intent } = req.body;
    
    // 필수 필드 검증
    if (!message_date || !content_message) {
      return res.status(400).json({
        success: false,
        message: '메시지 일자와 내용은 필수입니다.'
      });
    }
    
    // 메시지 존재 확인
    const [existing] = await pool.query(
      'SELECT id FROM mary_message WHERE id = ?',
      [id]
    );
    
    if (Array.isArray(existing) && existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: '해당 메시지를 찾을 수 없습니다.'
      });
    }
    
    // 메시지 업데이트
    await pool.query(`
      UPDATE mary_message SET
        message_date = ?,
        content_message = ?,
        prayer_priest = ?,
        prayer_intent = ?
      WHERE id = ?
    `, [message_date, content_message, prayer_priest || null, prayer_intent || null, id]);
    
    res.json({
      success: true,
      message: '성모님 메시지가 성공적으로 수정되었습니다.'
    });
  } catch (error) {
    console.error('성모님 메시지 수정 에러:', error);
    res.status(500).json({
      success: false,
      message: '성모님 메시지 수정에 실패했습니다.'
    });
  }
};

// 성모님 메시지 삭제
export const deleteMarianMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // 메시지 존재 확인
    const [existing] = await pool.query(
      'SELECT id FROM mary_message WHERE id = ?',
      [id]
    );
    
    if (Array.isArray(existing) && existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: '해당 메시지를 찾을 수 없습니다.'
      });
    }
    
    // 메시지 삭제
    await pool.query('DELETE FROM mary_message WHERE id = ?', [id]);
    
    res.json({
      success: true,
      message: '성모님 메시지가 성공적으로 삭제되었습니다.'
    });
  } catch (error) {
    console.error('성모님 메시지 삭제 에러:', error);
    res.status(500).json({
      success: false,
      message: '성모님 메시지 삭제에 실패했습니다.'
    });
  }
};
