# Thiết kế: Menu góc GAME / INFO (v1.1.5)

## Mục tiêu

Menu chính pre-1.1.5 gánh toàn bộ tương tác (CTA, mode cards, scoreboard, achievements, language, how-to) — quá tải thị giác và phá luật phân cấp. v1.1.5 gom lại theo hai trục:

- **GAME (góc dưới-trái)** — mọi thứ dẫn tới việc *chơi*: Chơi · Chơi tiếp · Chế độ · Cách chơi · Bảng xếp hạng · Thành tựu · Cài đặt.
- **INFO (góc dưới-phải)** — mọi thứ dẫn tới việc *biết về dự án*: About · Changelog · Quit.

## Nguyên tắc

1. **Hai cụm, không hơn** — không cột thứ ba; hero chỉ còn chữ + mascot.
2. **Hành động chính luôn nhìn thấy** — CHƠI là nút primary vàng; CHƠI TIẾP bật/tắt theo `locheo.run.v1` (không bao giờ bấm rồi mới báo lỗi).
3. **Mọi thứ khác là modal** — đóng bằng `Escape`, bấm backdrop, hoặc nút ✕; nội dung modal tái sử dụng component sẵn có (`ScoreBoard`, `AchievementsPanel`, `ModeSelector`) để không nhân bản logic.
4. **Không phá muscle memory** — `Enter` vẫn bắt đầu; `P/R/M` không còn rò rỉ khi modal mở.
5. **A11y** — panel là `<section aria-label>`, modal là `role="dialog" aria-modal`, switch là `role="switch"`; `prefers-reduced-motion` tắt sạch animation.

## Vị trí & responsive

- Desktop: hai panel nằm trong flow bên dưới hero căn giữa; ticker đã được bỏ ở v1.1.8.
- Mobile: mascot vẫn hiện; chiều rộng panel giới hạn theo viewport, menu cuộn khi chiều cao không đủ.
- Modal neo vào viewport, `max-h-[86vh]` + scroll nội bộ.

## Trạng thái «Chơi tiếp»

| Điều kiện | Nút | Hint |
| --- | --- | --- |
| Không có snapshot | `disabled`, mờ, saturation 0 | "Chưa có ván nào đang dở" |
| Có snapshot | bật, brine-500 | `{chế độ} · {điểm} điểm · {n} hũ` |
| Sau khi resume/game over | `disabled` (snapshot đã xóa) | quay lại trạng thái không snapshot |

## Cập nhật v1.1.6 — Settings lớn dần

Panel góc **không đổi** (vẫn GAME/INFO, vẫn 6 + 3 mục) nhưng nội dung sau mục «Cài đặt» thì đổi hẳn:
Settings từ 4 toggle phẳng thành **6 section** (preset · âm thanh · giao diện · ngôn ngữ · sao lưu · dữ liệu)
với 3 loại control (switch / segmented / stepper). Quyết định v1.1.5 — *modal chứ không phải màn riêng* —
vẫn giữ: modal rộng `max-w-2xl`, body scroll riêng, `useFocusTrap` giữ Tab bên trong.

Ngôn ngữ rời khỏi menu (xoá `LanguageSwitcher` góc trên-phải) và trở thành section 4 của Settings —
một chỗ duy nhất cho mọi cấu hình, đúng tinh thần "hai cụm, không hơn".

## Không làm (non-goals)

- Không tách «Cài đặt» thành màn riêng — modal rộng + scroll là đủ cho 6 section (quyết định giữ nguyên từ v1.1.5).
- Không auto-đóng tab khi bấm THOÁT (trình duyệt chặn) — chỉ best-effort + hướng dẫn.
- Không đổi ngữ nghĩa thắng/thua, không đổi balance mode.
