import type { ChangelogEntry } from "../types";

/** Final 1.1.x patch before the planned 1.2.0 update. */
export const V1_1_8: ChangelogEntry = {
  version: "1.1.8",
  date: "2026-11-13",
  kind: "fix",
  vi: "Bản vá cuối trước 1.2.0: menu gọn, hướng dẫn trong GAME và công cụ phát triển an toàn hơn.",
  en: "Final patch before 1.2.0: a cleaner menu, instructions in GAME and safer development tooling.",
  itemsVi: [
    "Căn giữa chữ LỌ CHÉO, đặt lọ và các vòng sáng ngay bên dưới trên cả màn hình nhỏ.",
    "Chuyển hướng dẫn, điều khiển bàn phím và cảm ứng vào mục Cách chơi trong GAME.",
    "Giữ nguyên các bảng GAME và INFO, chế độ chơi, tiến trình và cài đặt.",
    "Cập nhật Vite và Vitest để xử lý các cảnh báo bảo mật của công cụ phát triển.",
    "Đồng bộ phiên bản, ghi chú phát hành và ngày trong tài liệu; bổ sung kiểm thử hồi quy menu.",
  ],
  itemsEn: [
    "Center the LỌ CHÉO wordmark with the jar and glowing orbits below, including on small screens.",
    "Move the rules, keyboard and touch controls into How to play in the GAME menu.",
    "Keep the GAME and INFO panels, game modes, progress and settings intact.",
    "Update Vite and Vitest to address development-tool security advisories.",
    "Synchronize the version, release notes and documented dates; add menu regression tests.",
  ],
};
