import pool from '../config/database';

async function removeDuplicateImages() {
  const connection = await pool.getConnection();

  try {
    // console.log('중복 이미지 제거 시작...');

    // 1. 중복 이미지 찾기 (original_name과 file_size 기준)
    const [duplicates] = await connection.query(`
      SELECT original_name, file_size, COUNT(*) as count, GROUP_CONCAT(id) as ids
      FROM image_library 
      GROUP BY original_name, file_size 
      HAVING COUNT(*) > 1
    `);

    // console.log(`총 ${(duplicates as any[]).length}개의 중복 그룹을 찾았습니다.`);

    for (const duplicate of duplicates as any[]) {
      const ids = duplicate.ids.split(',').map((id: string) => parseInt(id));
      const keepId = ids[0]; // 첫 번째 이미지 유지
      const deleteIds = ids.slice(1); // 나머지 삭제

      // console.log(`중복 그룹 처리: ${duplicate.original_name} (${duplicate.count}개) - ${keepId} 유지, ${deleteIds.join(', ')} 삭제`);

      // 중복 이미지들 삭제
      if (deleteIds.length > 0) {
        await connection.query(
          'DELETE FROM image_library WHERE id IN (?)',
          [deleteIds]
        );
      }

      // 유지할 이미지의 usage_count 업데이트
      await connection.query(
        'UPDATE image_library SET usage_count = ? WHERE id = ?',
        [duplicate.count, keepId]
      );
    }

    // console.log('중복 이미지 제거 완료!');

    // 2. 결과 확인
    const [totalImages] = await connection.query('SELECT COUNT(*) as count FROM image_library');
    // console.log(`총 이미지 수: ${(totalImages as any[])[0].count}개`);

  } catch (error) {
    console.error('중복 이미지 제거 중 오류:', error);
  } finally {
    connection.release();
    process.exit(0);
  }
}

removeDuplicateImages();

