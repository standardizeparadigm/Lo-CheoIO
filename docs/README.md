# `docs/` — tài liệu Lọ Chéo

## Release notes (historical + current)

**Tám bản**: `releases/v1.0.0.md` → `releases/v1.1.6.md`. Bản hiện hành là **v1.1.6** — 6 mục cài đặt, 4 preset, sao lưu JSON, 7 ngôn ngữ chuyển vào Settings. Các bản cũ giữ nguyên (historical), chỉ đính chính fact-sai nghiêm trọng nếu có.

| Bản | Nội dung chính | Tests lúc phát hành |
| --- | --- | --- |
| [v1.1.6](releases/v1.1.6.md) | Settings 6 mục · preset · backup JSON · a11y pass | 222 / 29 file |
| [v1.1.5](releases/v1.1.5.md) | Panel góc GAME/INFO, menu mới | 113 |
| [v1.1.4](releases/v1.1.4.md) | 2 chế độ mới (Lễ Hội Combo · Đại Tiệc Dưa) | 61 |
| v1.1.3 → v1.0.0 | Xem từng file trong `releases/` | — |

## Design docs (`design/`)

- `menu-corners.md` — triết lý 2 panel góc GAME/INFO, a11y, responsive.
- `menu-icons.md` — bộ icon SVG tự vẽ cho panel góc (grid 24px, stroke 2.2).
- `menu-scene.md` — 8 lớp nền menu (tinh vân, sao, sàn gạch, vòng sáng…) + ngân sách render.
- `modes-balance.md` — bảng cân bằng 9 chế độ + cách chỉnh số.
- `save-format.md` — spec `locheo.run.v1` (snapshot ván dở).
- `settings-format.md` — spec `locheo.settings.v1` (v1.1.6: 10 field, 6 mục UI).

## Hướng dẫn contributor (`guides/`)

| Guide | Dành cho |
| --- | --- |
| `engine-overview.md` | Đọc engine lần đầu (phase machine, render pipeline, pure/impure) |
| `keyboard-shortcuts.md` | Phím tắt + touch + modal-swallow semantics |
| `storage-keys.md` | Inventory 8 key localStorage + wipe semantics + lớp `safeStorage` |
| `accessibility.md` | A11y hiện có, hạn chế, quy tắc khi thêm UI |
| `performance.md` | Ngân sách render + cách đo |
| `adding-a-locale.md` | Thêm/sửa 1 ngôn ngữ (parity rules) |
| `release-process.md` | Playbook phát hành 1 version (học từ v1.1.5) |
| `glossary.md` | Từ vựng game cho translator |
| `troubleshooting.md` | Sự cố thường gặp — đen màn hình, audio, «Chơi tiếp», launcher, build |

## Khác

- `assets.md` — kho SVG SMIL (banner, corner-menu…) + quy ước thêm/sửa.
- `DESCRIPTION.md` — mô tả ngắn cho dev/cộng đồng.
