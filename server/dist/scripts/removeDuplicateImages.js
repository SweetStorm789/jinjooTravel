"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
function removeDuplicateImages() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield database_1.default.getConnection();
        try {
            console.log('중복 이미지 제거 시작...');
            // 1. 중복 이미지 찾기 (original_name과 file_size 기준)
            const [duplicates] = yield connection.query(`
      SELECT original_name, file_size, COUNT(*) as count, GROUP_CONCAT(id) as ids
      FROM image_library 
      GROUP BY original_name, file_size 
      HAVING COUNT(*) > 1
    `);
            console.log(`총 ${duplicates.length}개의 중복 그룹을 찾았습니다.`);
            for (const duplicate of duplicates) {
                const ids = duplicate.ids.split(',').map((id) => parseInt(id));
                const keepId = ids[0]; // 첫 번째 이미지 유지
                const deleteIds = ids.slice(1); // 나머지 삭제
                console.log(`중복 그룹 처리: ${duplicate.original_name} (${duplicate.count}개) - ${keepId} 유지, ${deleteIds.join(', ')} 삭제`);
                // 중복 이미지들 삭제
                if (deleteIds.length > 0) {
                    yield connection.query('DELETE FROM image_library WHERE id IN (?)', [deleteIds]);
                }
                // 유지할 이미지의 usage_count 업데이트
                yield connection.query('UPDATE image_library SET usage_count = ? WHERE id = ?', [duplicate.count, keepId]);
            }
            console.log('중복 이미지 제거 완료!');
            // 2. 결과 확인
            const [totalImages] = yield connection.query('SELECT COUNT(*) as count FROM image_library');
            console.log(`총 이미지 수: ${totalImages[0].count}개`);
        }
        catch (error) {
            console.error('중복 이미지 제거 중 오류:', error);
        }
        finally {
            connection.release();
            process.exit(0);
        }
    });
}
removeDuplicateImages();
