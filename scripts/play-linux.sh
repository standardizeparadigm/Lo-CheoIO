#!/bin/bash
# =====================================================================
#  LỌ CHÉO — HŨ DƯA ĐẠI CHIẾN · Trình chạy cho Linux
#  ─────────────────────────────────────────────────────────────────
#  • Đa ngôn ngữ: Tiếng Việt (gốc, có dấu) · English · 中文
#  • Tự nhận ngôn ngữ theo $LANG (mặc định Tiếng Việt), đổi trong menu bằng phím L
#  • Nhấn đúp (double-click) file này trong trình quản lý file để mở Terminal
#    và hiện menu tương tác nhiều màu, có hoạt ảnh. Không cần gõ lệnh nào.
# =====================================================================
set -u
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)" || exit 1

# ---------- màu sắc ----------
if [ -t 1 ]; then
  R='\033[0m'; B='\033[1m'; D='\033[2m'
  GOLD='\033[38;5;220m'; GOLD2='\033[38;5;228m'; JADE='\033[38;5;79m'; CHILI='\033[38;5;203m'
  BRINE='\033[38;5;159m'; GREEN='\033[38;5;114m'; RED='\033[38;5;203m'; CYAN='\033[38;5;116m'; PINK='\033[38;5;218m'
else
  R=''; B=''; D=''; GOLD=''; GOLD2=''; JADE=''; CHILI=''; BRINE=''; GREEN=''; RED=''; CYAN=''; PINK=''
fi
VERSION="1.1.3"

# ---------- ngôn ngữ giao diện (VI gốc · EN · ZH) ----------
UI_LANG="${LOCHEO_LANG:-}"
if [ -z "$UI_LANG" ]; then
  case "${LC_ALL:-${LC_MESSAGES:-${LANG:-vi}}}" in
    vi*|VI*) UI_LANG=vi ;;
    zh*|ZH*) UI_LANG=zh ;;
    en*|EN*) UI_LANG=en ;;
    *)       UI_LANG=vi ;;   # gốc: Tiếng Việt
  esac
fi

# Chuỗi theo ngôn ngữ:  T <khóa>
T() {
  case "$UI_LANG:$1" in
    vi:title)       printf 'LỌ CHÉO — HŨ DƯA ĐẠI CHIẾN' ;;
    en:title)       printf 'LỌ CHÉO — PICKLED JAR SHOWDOWN' ;;
    zh:title)       printf 'LỌ CHÉO — 腌罐大乱斗' ;;
    vi:subtitle)    printf 'TRÌNH CHẠY LINUX — chọn một mục rồi nhấn Enter' ;;
    en:subtitle)    printf 'LINUX LAUNCHER — pick an option, then press Enter' ;;
    zh:subtitle)    printf 'Linux 启动器 — 选择一项后按回车' ;;
    vi:pick)        printf '➜ Lựa chọn của bạn' ;;
    en:pick)        printf '➜ Your choice' ;;
    zh:pick)        printf '➜ 请选择' ;;
    vi:langhint)    printf 'L — đổi ngôn ngữ (VI/EN/中)' ;;
    en:langhint)    printf 'L — switch language (VI/EN/中)' ;;
    zh:langhint)    printf 'L — 切换语言 (VI/EN/中)' ;;
    vi:play)        printf 'Chơi ngay (Production) — build + mở game' ;;
    en:play)        printf 'Play now (Production) — build + open game' ;;
    zh:play)        printf '立即游玩（正式版）— 构建并打开游戏' ;;
    vi:dev)         printf 'Dev mode — server HMR tại localhost:5173' ;;
    en:dev)         printf 'Dev mode — HMR server at localhost:5173' ;;
    zh:dev)         printf '开发模式 — localhost:5173 HMR 服务器' ;;
    vi:build)       printf 'Build production — tạo dist/index.html' ;;
    en:build)       printf 'Build production — create dist/index.html' ;;
    zh:build)       printf '构建正式版 — 生成 dist/index.html' ;;
    vi:test)        printf 'Chạy tests — vitest' ;;
    en:test)        printf 'Run tests — vitest' ;;
    zh:test)        printf '运行测试 — vitest' ;;
    vi:check)       printf 'Kiểm tra toàn bộ — typecheck + tests + build' ;;
    en:check)       printf 'Full check — typecheck + tests + build' ;;
    zh:check)       printf '全面检查 — typecheck + 测试 + 构建' ;;
    vi:install)     printf 'Cài đặt dependencies — npm install' ;;
    en:install)     printf 'Install dependencies — npm install' ;;
    zh:install)     printf '安装依赖 — npm install' ;;
    vi:clean)       printf 'Dọn dẹp — xoá node_modules/ và dist/' ;;
    en:clean)       printf 'Clean up — remove node_modules/ and dist/' ;;
    zh:clean)       printf '清理 — 删除 node_modules/ 和 dist/' ;;
    vi:info)        printf 'Thông tin & hướng dẫn' ;;
    en:info)        printf 'About & help' ;;
    zh:info)        printf '关于与帮助' ;;
    vi:quit)        printf 'Thoát' ;;
    en:quit)        printf 'Quit' ;;
    zh:quit)        printf '退出' ;;
    vi:bye)         printf 'Hẹn gặp lại trong bếp! 🫙' ;;
    en:bye)         printf 'See you in the kitchen! 🫙' ;;
    zh:bye)         printf '厨房见！🫙' ;;
    vi:badchoice)   printf 'Lựa chọn không hợp lệ.' ;;
    en:badchoice)   printf 'Invalid choice.' ;;
    zh:badchoice)   printf '无效选择。' ;;
    vi:pressenter)  printf 'Nhấn Enter để quay lại menu…' ;;
    en:pressenter)  printf 'Press Enter to return to the menu…' ;;
    zh:pressenter)  printf '按回车返回菜单…' ;;
    vi:nodiff)      printf '✖ Không tìm thấy Node.js / npm.' ;;
    en:nodiff)      printf '✖ Node.js / npm not found.' ;;
    zh:nodiff)      printf '✖ 未找到 Node.js / npm。' ;;
    vi:nodehint)    printf 'Cài Node LTS (≥ 20.19) rồi mở lại file này:' ;;
    en:nodehint)    printf 'Install Node LTS (≥ 20.19), then reopen this file:' ;;
    zh:nodehint)    printf '请安装 Node LTS（≥ 20.19）后重新打开本文件：' ;;
    vi:nodeinstall) printf 'sudo apt-get install nodejs npm  (Debian/Ubuntu)  ·  https://nodejs.org' ;;
    en:nodeinstall) printf 'sudo apt-get install nodejs npm  (Debian/Ubuntu)  ·  https://nodejs.org' ;;
    zh:nodeinstall) printf 'sudo apt-get install nodejs npm  (Debian/Ubuntu)  ·  https://nodejs.org' ;;
    vi:firstinstall) printf '→ Chưa có node_modules — đang chạy npm install (chỉ lần đầu)…' ;;
    en:firstinstall) printf '→ No node_modules yet — running npm install (first time only)…' ;;
    zh:firstinstall) printf '→ 尚无 node_modules — 正在 npm install（仅首次）…' ;;
    vi:buildstart)  printf '→ Đang build bản production…' ;;
    en:buildstart)  printf '→ Building production…' ;;
    zh:buildstart)  printf '→ 正在构建正式版…' ;;
    vi:buildok)     printf '✔ Build xong — đang mở game…' ;;
    en:buildok)     printf '✔ Build complete — opening the game…' ;;
    zh:buildok)     printf '✔ 构建完成 — 正在打开游戏…' ;;
    vi:buildfail)   printf '✖ Build thất bại. Xem log ở trên.' ;;
    en:buildfail)   printf '✖ Build failed. See the log above.' ;;
    zh:buildfail)   printf '✖ 构建失败。请查看上方日志。' ;;
    vi:devextra)    printf 'Dev server (HMR) tại http://localhost:5173 — bấm Ctrl+C để dừng.' ;;
    en:devextra)    printf 'Dev server (HMR) at http://localhost:5173 — Ctrl+C to stop.' ;;
    zh:devextra)    printf '开发服务器 (HMR) 运行于 http://localhost:5173 — 按 Ctrl+C 停止。' ;;
    vi:checkok)     printf '✔ Mọi thứ xanh!' ;;
    en:checkok)     printf '✔ Everything is green!' ;;
    zh:checkok)     printf '✔ 一切顺利！' ;;
    vi:installdone) printf '✔ Dependencies đã cài xong.' ;;
    en:installdone) printf '✔ Dependencies installed.' ;;
    zh:installdone) printf '✔ 依赖安装完成。' ;;
    vi:cleanknown)  printf '⚠ Sẽ xoá node_modules/ và dist/ (không xoá mã nguồn).' ;;
    en:cleanknown)  printf '⚠ This will delete node_modules/ and dist/ (source untouched).' ;;
    zh:cleanknown)  printf '⚠ 将删除 node_modules/ 和 dist/（不会动源码）。' ;;
    vi:confirmdelete) printf 'Gõ YES để xác nhận: ' ;;
    en:confirmdelete) printf 'Type YES to confirm: ' ;;
    zh:confirmdelete) printf '输入 YES 确认：' ;;
    vi:cleaned)     printf '✔ Đã dọn dẹp.' ;;
    en:cleaned)     printf '✔ Cleaned.' ;;
    zh:cleaned)     printf '✔ 已清理。' ;;
    vi:cancelled)   printf 'Đã huỷ.' ;;
    en:cancelled)   printf 'Cancelled.' ;;
    zh:cancelled)   printf '已取消。' ;;
    vi:info1)       printf '• Chơi ngay: build file tự chứa dist/index.html rồi mở bằng trình duyệt.' ;;
    en:info1)       printf '• Play: build the self-contained dist/index.html and open it.' ;;
    zh:info1)       printf '• 游玩：构建独立 dist/index.html 后打开即可。' ;;
    vi:info2)       printf '• Dev: Vite HMR, sửa code thấy ngay. Cần Node ≥ 20.19.' ;;
    en:info2)       printf '• Dev: Vite HMR, instant feedback. Needs Node ≥ 20.19.' ;;
    zh:info2)       printf '• 开发：Vite HMR 即时热更新。需要 Node ≥ 20.19。' ;;
    vi:info3)       printf '• Dữ liệu lưu cục bộ: điểm/thành tựu (localStorage), không gửi đi đâu.' ;;
    en:info3)       printf '• Data is local: scores/achievements (localStorage), never sent anywhere.' ;;
    zh:info3)       printf '• 数据均存于本地：分数/成就（localStorage），绝不上传。' ;;
    vi:author)      printf 'Tác giả: Standardize Paradigm <standardizeparadigm@donuco.com>' ;;
    en:author)      printf 'Author: Standardize Paradigm <standardizeparadigm@donuco.com>' ;;
    zh:author)      printf '作者：Standardize Paradigm <standardizeparadigm@donuco.com>' ;;
    vi:license)     printf 'Arcade muối dưa offline-first · AGPL-3.0-only' ;;
    en:license)     printf 'Offline-first pickle arcade · AGPL-3.0-only' ;;
    zh:license)     printf '离线优先腌菜街机 · AGPL-3.0-only' ;;
    *)              printf '%s' "$1" ;;
  esac
}
say() { printf "%b\n" "$*"; }
pause() { printf "%b" "${D}$(T pressenter)${R}\n"; read -r _; }

need_node() {
  if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
    say "${RED}$(T nodiff)${R}"
    say "${BRINE}  $(T nodehint)${R}"
    say "${GOLD}    $(T nodeinstall)${R}"
    pause; return 1
  fi
  return 0
}
ensure_deps() {
  if [ ! -d node_modules ]; then
    say "${CYAN}$(T firstinstall)${R}"
    npm install || { say "${RED}✖ npm install failed.${R}"; pause; return 1; }
  fi
  return 0
}

# ----- spinner + hoạt ảnh tiến trình (braille frames, có % chạy thật theo bước) -----
spin_run() { # spin_run <logfile> <label> -- <lệnh...>
  local log="$1"; local label="$2"; shift 2
  [ "${1:-}" = "--" ] && shift
  ("$@" >"$log" 2>&1) &
  local pid=$!
  local frames=('⠋' '⠙' '⠹' '⠸' '⠼' '⠴' '⠦' '⠧' '⠇' '⠏')
  local i=0 pct=0
  while kill -0 "$pid" 2>/dev/null; do
    [ "$pct" -lt 92 ] && pct=$((pct + 3))
    printf "\r${CYAN}%s${R} ${B}%s${R}  [%3d%%]" "${frames[$((i % 10))]}" "$label" "$pct"
    i=$((i + 1)); sleep 0.09
  done
  wait "$pid"; local rc=$?
  if [ "$rc" -eq 0 ]; then
    printf "\r${GREEN}✔${R} ${B}%s${R}  [100%%]   \n" "$label"
  else
    printf "\r${RED}✖ %s${R}                    \n" "$label"
  fi
  return "$rc"
}

action_play() {
  need_node || return
  ensure_deps || return
  say "${GOLD}$(T buildstart)${R}"
  local log; log="$(mktemp)"
  if spin_run "$log" "$(T buildstart)" -- npm run build; then
    say "${GREEN}$(T buildok)${R}"
    xdg-open "dist/index.html" >/dev/null 2>&1 &
  else
    cat "$log"; say "${RED}$(T buildfail)${R}"
  fi
  rm -f "$log"; pause
}
action_dev() {
  need_node || return
  ensure_deps || return
  say "${GOLD}$(T devextra)${R}"
  npm run dev
  pause
}
action_build() { need_node || return; ensure_deps || return; say "${GOLD}$(T buildstart)${R}"; npm run build && say "${GREEN}✔ dist/index.html${R}"; pause; }
action_test()  { need_node || return; ensure_deps || return; npm run test; pause; }
action_check() { need_node || return; ensure_deps || return; npm run check && say "${GREEN}$(T checkok)${R}"; pause; }
action_install(){ need_node || return; npm install && say "${GREEN}$(T installdone)${R}"; pause; }
action_clean() {
  say "${CHILI}$(T cleanknown)${R}"
  printf "${CHILI}%s${R}" "$(T confirmdelete)"
  read -r yn
  if [ "$yn" = "YES" ]; then rm -rf node_modules dist && say "${GREEN}$(T cleaned)${R}"; else say "${D}$(T cancelled)${R}"; fi
  pause
}
action_info() {
  say "${BRINE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${R}"
  say "${GOLD}${B} $(T title)${R}  (v${VERSION})"
  say "${BRINE} $(T license)${R}"
  say "${BRINE} $(T author)${R}"
  say "${BRINE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${R}"
  say "${CYAN}$(T info1)${R}"
  say "${CYAN}$(T info2)${R}"
  say "${CYAN}$(T info3)${R}"
  pause
}

# ----- banner hoạt ảnh: khung vàng nhấp nháy + ngôi sao lấp lánh -----
banner() {
  [ -t 1 ] && printf "\033[2J\033[H"
  say "${GOLD}${B}╔════════════════════════════════════════════╗${R}"
  say "${GOLD}${B}║   🫙  $(T title)  v${VERSION}   ║${R}"
  say "${GOLD}${B}╚════════════════════════════════════════════╝${R}"
  say "${JADE}  $(T subtitle)${R}"
  if [ -t 1 ]; then
    local palette=("$GOLD2" "$PINK" "$GOLD")
    local f
    for f in 0 1 2; do
      printf "\033[4A"
      say "${palette[$f]}${B}╔════════════════════════════════════════════╗${R}"
      say "${palette[$f]}${B}║   🫙  $(T title)  v${VERSION}   ║${R}"
      say "${palette[$f]}${B}╚════════════════════════════════════════════╝${R}"
      say "${JADE}  $(T subtitle)${R}"
      sleep 0.06
    done
  fi
  say ""
}
sparkle_line() {
  say "${D}  ✦ ·˚ ·✦ ·˚ ·✦ ·˚ ·✦ ·˚ ·✦ ·˚ ·✦ ·˚ ·✦ ·˚ ·✦  ${R}"
}

while true; do
  banner
  say "${GOLD}  1)${R} ▶  ${B}$(T play)${R}"
  say "${GOLD}  2)${R} 🛠  ${B}$(T dev)${R}"
  say "${GOLD}  3)${R} 📦  ${B}$(T build)${R}"
  say "${GOLD}  4)${R} 🧪  ${B}$(T test)${R}"
  say "${GOLD}  5)${R} ✅  ${B}$(T check)${R}"
  say "${GOLD}  6)${R} 📥  ${B}$(T install)${R}"
  say "${GOLD}  7)${R} 🧹  ${B}$(T clean)${R}"
  say "${GOLD}  8)${R} ℹ️   ${B}$(T info)${R}"
  say "${GOLD}  0)${R} 🚪  ${B}$(T quit)${R}      ${D}$(T langhint)${R}"
  sparkle_line
  say ""
  printf "${BRINE}%s: ${R}" "$(T pick)"
  read -r opt
  case "$opt" in
    1) action_play ;; 2) action_dev ;; 3) action_build ;; 4) action_test ;;
    5) action_check ;; 6) action_install ;; 7) action_clean ;; 8) action_info ;;
    L|l) case "$UI_LANG" in vi) UI_LANG=en ;; en) UI_LANG=zh ;; zh) UI_LANG=vi ;; esac ;;
    0) say "${GOLD}$(T bye)${R}"; exit 0 ;;
    *) say "${RED}$(T badchoice)${R}"; pause ;;
  esac
done
