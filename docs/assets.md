# `assets/` — kho đồ họa SMIL

Tất cả hình là **SVG tự chứa có animation SMIL** — không JS, không phụ thuộc ngoài, nhúng trực tiếp trong Markdown/HTML.

| File | Nội dung | Dùng ở |
| --- | --- | --- |
| `banner.svg` | Banner chính thức **V1.1.5** (9 chế độ · 16 thành tựu) | README ×10 đầu trang |
| `demo.svg` | Mô phỏng gameplay (lọ CHÉO, dưa rơi) | README ×10 |
| `items.svg` | 14 nguyên liệu (dưa, mốc, ruồi…) | README ×10, CONTRIBUTING |
| `modes.svg` | 9 chế độ chơi | README ×10 |
| `languages.svg` | 7 ngôn ngữ giao diện | README ×10 |
| `new-modes.svg` | 2 chế độ mới của v1.1.4 (Lễ Hội Combo · Đại Tiệc Dưa) | README ×10 (mục what's new 1.1.4) |
| `corner-menu.svg` | 2 panel góc GAME/INFO (v1.1.5) | README ×10 (mục what's new 1.1.5) |
| `divider.svg` | Dải sparkle ngăn cách section | README ×10 |
| `license.svg` | Con dấu AGPL-3.0 copyleft | README ×10 |
| `favicon.svg` | Favicon động (lọ lắc + tia lấp lánh) | `index.html`, `public/favicon.svg` |
| `favicon-512.png` | Favicon raster 512px (OG/touch icon) | repo root + social preview |

## Quy ước khi thêm/sửa SVG

1. **SMIL only** (`<animate>`, `<animateTransform>`) — không nhúng `<script>`. GitHub/GitLab README render được SMIL qua `<img>`.
2. Text tiếng Việt **giữ nguyên dấu** — mọi SVG dùng UTF-8.
3. Kích thước mục tiêu ≤ 40 KB/file (README nặng = mất người đọc).
4. Màu bám palette: jade `#0b2b2b`, brine `#b6e07a`, turmeric `#f5a81c`, clay `#f4e3c2`, chili `#e63b2e`.
5. Banner phải cập nhật `APP_VERSION` cùng commit với version bump (xem `docs/guides/release-process.md`).
