# Thiết kế: Menu góc GAME / INFO (v1.1.5)

## Mục tiêu

Menu chính pre-1.1.5 gánh toàn bộ tương tác (CTA, mode cards, scoreboard, achievements, language, how-to) — quá tải thị giác và phá luật phân cấp. v1.1.5 gom lại theo hai trục:

- **GAME (góc dưới-trái)** — mọi thứ dẫn tới việc *chơi*: Chơi · Chơi tiếp · Chế độ · Bảng xếp hạng · Thành tựu · Cài đặt.
- **INFO (góc dưới-phải)** — mọi thứ dẫn tới việc *biết về dự án*: About · Changelog · Quit.

## Nguyên tắc

1. **Hai cụm, không hơn** — không cột thứ ba; hero chỉ còn chữ + mascot.
2. **Hành động chính luôn nhìn thấy** — CHƠI là nút primary vàng; CHƠI TIẾP bật/tắt theo `locheo.run.v1` (không bao giờ bấm rồi mới báo lỗi).
3. **Mọi thứ khác là modal** — đóng bằng `Escape`, bấm backdrop, hoặc nút ✕; nội dung modal tái sử dụng component sẵn có (`ScoreBoard`, `AchievementsPanel`, `ModeSelector`) để không nhân bản logic.
4. **Không phá muscle memory** — `Enter` vẫn bắt đầu; `P/R/M` không còn rò rỉ khi modal mở.
5. **A11y** — panel là `<section aria-label>`, modal là `role="dialog" aria-modal`, switch là `role="switch"`; `prefers-reduced-motion` tắt sạch animation.

## Vị trí & responsive

- Desktop: 2 panel nằm trong flow (`flex items-end justify-between`) phía trên ticker, dưới hero — neo theo góc màn hình vật lý, cách nhau tuyệt đối.
- Mobile (<lg): mascot ẩn, panel w-44/w-48, hint text thu nhỏ; không overlap ticker vì cùng flow column.
- Modal luôn `max-h-[86vh]` + scroll nội bộ.

## Trạng thái «Chơi tiếp»

| Điều kiện | Nút | Hint |
| --- | --- | --- |
| Không có snapshot | `disabled`, mờ, saturation 0 | "Chưa có ván nào đang dở" |
| Có snapshot | bật, brine-500 | `{chế độ} · {điểm} điểm · {n} hũ` |
| Sau khi resume/game over | `disabled` (snapshot đã xóa) | quay lại trạng thái không snapshot |

## Không làm (non-goals)

- Không tách «Settings» thành màn riêng (modal là đủ cho 4 toggle + danger zone).
- Không auto-đóng tab khi bấm THOÁT (trình duyệt chặn) — chỉ best-effort + hướng dẫn.
- Không đổi ngữ nghĩa thắng/thua, không đổi balance mode.
