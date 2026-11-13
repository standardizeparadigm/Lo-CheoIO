import type { ChangelogEntry } from "../types";

/**
 * v1.1.2 — see docs/releases/v1.1.2.md for the long-form release notes.
 * One release per file keeps the history easy to diff and to translate.
 */
export const V1_1_2: ChangelogEntry = {
  version: "1.1.2",
  date: "2026-11-02",
  kind: "feature",
  vi: "Đua 60 Giây · Mùa Vàng, combo 12+ bốc lửa, launcher nhấn-đúp cho 3 hệ điều hành, README 10 ngôn ngữ",
  en: "60-Second Rush · Gold Rush, flaming 12+ combos, double-click launchers for three OSes, READMEs in ten languages",
  itemsVi: [
    "Chế độ «Đua 60 Giây» — đồng hồ đếm ngược trên HUD, còn ≤10 giây thì nhấp nháy đỏ; hết giờ là hết ván",
    "Chế độ «Mùa Vàng» — vật phẩm vàng xuất hiện dày hơn hẳn, hũ đầy nhanh, điểm mỗi củ cao hơn",
    "Hai thành tựu mới (tổng 12): VUA ĐUA 60 GIÂY và MÙA VÀNG BỘI THU",
    "Combo từ ×12 trở lên bốc lửa: vệt lửa theo sau lọ và hạt than hồng",
    "Bộ launcher nhấn-đúp cho macOS · Windows · Linux — không cần mở Terminal gõ lệnh",
    "Menu launcher có hoạt ảnh: banner đổi màu, spinner, thanh tiến trình build thật",
    "README mở rộng ra 10 ngôn ngữ, mỗi bản có banner và animation riêng",
    "FIX: phím tắt game không còn kích hoạt khi đang gõ tên trong ô nhập",
    "49 unit tests",
  ],
  itemsEn: [
    "New mode “60-Second Rush” — a countdown on the HUD that blinks red under ten seconds; when it hits zero, the run ends",
    "New mode “Gold Rush” — golden items appear far more often, the jar fills faster and each pickle scores more",
    "Two new achievements (12 total): 60-SECOND KING and GOLDEN HARVEST",
    "Combos from ×12 upward catch fire: a flame trail behind the jar and ember particles",
    "Double-click launchers for macOS · Windows · Linux — no Terminal, no typing",
    "The launcher menu is animated: colour-cycling banner, spinner, real build progress bar",
    "READMEs expanded to ten languages, each with its own banner and animation",
    "FIX: gameplay hotkeys no longer fire while typing a name in the input",
    "49 unit tests",
  ],
};
