# Toàn bộ key `localStorage` của Lọ Chéo

Mọi dữ liệu đều nằm trên máy người chơi — game **không gửi byte nào lên mạng**.

| Key | Ghi bởi | Nội dung | Xóa khi |
| --- | --- | --- | --- |
| `locheo.scores.v1` | `storage.ts` | TOP 8 (normalize, dedupe theo id) | Hard reset (không có nút) |
| `locheo.progress.v1` | `storage.ts` | `{runs, totalJars, totalSliced, bestScore}` cộng dồn | Settings → Xóa dữ liệu |
| `locheo.achievements.v1` | `storage.ts` | Mảng id thành tựu đã mở | Settings → Xóa dữ liệu |
| `locheo.lang.v1` | `i18n/i18n.ts` | `"vi" \| "en" \| "zh" \| "ja" \| "ko" \| "es" \| "fr"` | Xóa thủ công |
| `locheo.mode.v1` | `App.tsx` | Chế độ đã chọn (`ModeId`) | Xóa thủ công |
| `locheo.settings.v1` | `settings.ts` | `{sfx, music, shake, reducedMotion}` | Xóa thủ công |
| `locheo.run.v1` | `runSave.ts` | Snapshot ván dở (xem `docs/design/save-format.md`) | Game over · ván mới · Resume · Xóa dữ liệu |

## Ghi chú an toàn

- Tất cả reader đều **chịu dữ liệu rác**: JSON hỏng / kiểu sai / thiếu field → fallback default, không bao giờ crash.
- `locheo.scores.v1` khi trống → board được seed bằng điểm của game (hiển thị TOP 8 "ma" làm mốc).
- **Private mode / storage bị chặn**: game chạy hoàn toàn in-memory; cài đặt không lưu được giữa các phiên — hiển thị bình thường, không báo lỗi.
- Settings → **Xóa dữ liệu đã lưu** dọn: scores · progress · achievements · run snapshot (gọi cả `clearAllProgress()` lẫn `clearSavedRun()`).
