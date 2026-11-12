#!/bin/bash
# =====================================================================
#  LỌ CHÉO — HŨ DƯA ĐẠI CHIẾN · Trình chạy cho Linux
#  Nhấn đúp (double-click) file này trong trình quản lý file để hiện terminal và hiện
#  menu tương tác. Không cần gõ lệnh nào.
# =====================================================================
set -u
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)" || exit 1

# ---------- màu sắc ----------
if [ -t 1 ]; then
  R='\033[0m'; B='\033[1m'; D='\033[2m'
  GOLD='\033[38;5;220m'; JADE='\033[38;5;79m'; CHILI='\033[38;5;203m'
  BRINE='\033[38;5;159m'; GREEN='\033[38;5;114m'; RED='\033[38;5;203m'; CYAN='\033[38;5;116m'
else
  R=''; B=''; D=''; GOLD=''; JADE=''; CHILI=''; BRINE=''; GREEN=''; RED=''; CYAN=''
fi
say() { printf "%b\n" "$*"; }
pause() { read -rp "$(printf "%b" "${D}Nhấn Enter để quay lại menu…${R}")" _; }

need_node() {
  if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
    say "${RED}✖ Không tìm thấy Node.js / npm.${R}"
    say "${BRINE}  Cài Node LTS (≥ 20.19) rồi mở lại file này:${R}"
    say "${GOLD}    sudo apt-get install nodejs npm${R}  (Debian/Ubuntu)  ·  https://nodejs.org"
    pause; return 1
  fi
  return 0
}
ensure_deps() {
  if [ ! -d node_modules ]; then
    say "${CYAN}➜ Chưa có node_modules — đang chạy npm install (chỉ lần đầu)…${R}"
    npm install || { say "${RED}✖ npm install thất bại.${R}"; pause; return 1; }
  fi
  return 0
}
action_play() {
  need_node || return
  ensure_deps || return
  say "${GOLD}➜ Đang build bản production…${R}"
  npm run build || { say "${RED}✖ Build thất bại. Xem log ở trên.${R}"; pause; return; }
  say "${GREEN}✔ Build xong — đang mở game…${R}"
  xdg-open "dist/index.html"
  pause
}
action_dev() {
  need_node || return
  ensure_deps || return
  say "${GOLD}➜ Đang mở dev server (HMR) tại http://localhost:5173 — bấm Ctrl+C để dừng.${R}"
  npm run dev
  pause
}
action_build() { need_node || return; ensure_deps || return; npm run build && say "${GREEN}✔ dist/index.html sẵn sàng.${R}"; pause; }
action_test()  { need_node || return; ensure_deps || return; npm run test; pause; }
action_check() { need_node || return; ensure_deps || return; npm run check && say "${GREEN}✔ Mọi thứ xanh!${R}"; pause; }
action_install(){ need_node || return; npm install && say "${GREEN}✔ Dependencies đã cài xong.${R}"; pause; }
action_clean() {
  say "${CHILI}⚠ Sẽ xoá node_modules/ và dist/ (không xoá mã nguồn).${R}"
  read -rp "$(printf "%b" "${CHILI}Gõ YES để xác nhận: ${R}")" yn
  if [ "$yn" = "YES" ]; then rm -rf node_modules dist && say "${GREEN}✔ Đã dọn dẹp.${R}"; else say "${D}Đã huỷ.${R}"; fi
  pause
}
action_info() {
  say "${BRINE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${R}"
  say "${GOLD}${B} LỌ CHÉO — HŨ DƯA ĐẠI CHIẾN${R}  (v1.1.2)"
  say "${BRINE} Arcade muối dưa offline-first · AGPL-3.0-only${R}"
  say "${BRINE} Tác giả: Standardize Paradigm <standardizeparadigm@donuco.com>${R}"
  say "${BRINE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${R}"
  say "${CYAN}• Chơi ngay: build file tự chứa dist/index.html rồi mở bằng trình duyệt.${R}"
  say "${CYAN}• Dev: Vite HMR, sửa code thấy ngay. Cần Node ≥ 20.19.${R}"
  say "${CYAN}• Dữ liệu lưu cục bộ: điểm/thành tựu (localStorage), không gửi đi đâu.${R}"
  pause
}
while true; do
  printf "\033[2J\033[H" 2>/dev/null || clear
  say "${GOLD}${B}╔════════════════════════════════════════════╗${R}"
  say "${GOLD}${B}║   🫙  LỌ CHÉO — HŨ DƯA ĐẠI CHIẾN  v1.1.2  ║${R}"
  say "${GOLD}${B}╚════════════════════════════════════════════╝${R}"
  say "${JADE}  TRÌNH CHẠY LINUX — chọn một mục rồi nhấn Enter${R}"
  say ""
  say "${GOLD}  1)${R} ▶  ${B}Chơi ngay (Production)${R} — build + mở game"
  say "${GOLD}  2)${R} 🛠  ${B}Dev mode${R} — server HMR tại localhost:5173"
  say "${GOLD}  3)${R} 📦  ${B}Build production${R} — tạo dist/index.html"
  say "${GOLD}  4)${R} 🧪  ${B}Chạy tests${R} — vitest"
  say "${GOLD}  5)${R} ✅  ${B}Kiểm tra toàn bộ${R} — typecheck + tests + build"
  say "${GOLD}  6)${R} 📥  ${B}Cài đặt dependencies${R} — npm install"
  say "${GOLD}  7)${R} 🧹  ${B}Dọn dẹp${R} — xoá node_modules/ và dist/"
  say "${GOLD}  8)${R} ℹ️   ${B}Thông tin & hướng dẫn${R}"
  say "${GOLD}  0)${R} 🚪  ${B}Thoát${R}"
  say ""
  read -rp "$(printf "%b" "${BRINE}➜ Lựa chọn của bạn: ${R}")" opt
  case "$opt" in
    1) action_play ;; 2) action_dev ;; 3) action_build ;; 4) action_test ;;
    5) action_check ;; 6) action_install ;; 7) action_clean ;; 8) action_info ;;
    0) say "${GOLD}Hẹn gặp lại trong bếp! 🫙${R}"; exit 0 ;;
    *) say "${RED}Lựa chọn không hợp lệ.${R}"; pause ;;
  esac
done
