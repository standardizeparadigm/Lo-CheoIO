@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion
cd /d "%~dp0.." || exit /b 1

rem ---------- ANSI colors (Windows 10/11 Terminal & cmd) ----------
set "R=[0m" & set "B=[1m" & set "D=[2m"
set "GOLD=[38;5;220m" & set "GOLD2=[38;5;228m" & set "PINK=[38;5;218m" & set "JADE=[38;5;79m" & set "CHILI=[38;5;203m"
set "BRINE=[38;5;159m" & set "GREEN=[38;5;114m" & set "CYAN=[38;5;116m"
set "VERSION=1.1.3"

rem ---------- Ngôn ngữ giao diện: VI gốc · EN · ZH (mặc định vi) ----------
if "%LOCHEO_LANG%"=="" (set "UILANG=vi") else (set "UILANG=%LOCHEO_LANG%")

rem ---------- Bảng chuỗi đa ngôn ngữ ----------
:T
set "TSTR=%~2"
if /i "%~1"=="title" (
  if /i "%UILANG%"=="vi" (set "TSTR=LỌ CHÉO — HŨ DƯA ĐẠI CHIẾN") else if /i "%UILANG%"=="zh" (set "TSTR=LỌ CHÉO — 腌罐大乱斗") else (set "TSTR=LỌ CHÉO — PICKLED JAR SHOWDOWN")
  exit /b 0
)
if /i "%~1"=="subtitle" (
  if /i "%UILANG%"=="vi" (set "TSTR=TRÌNH CHẠY WINDOWS — chọn một mục rồi nhấn Enter") else if /i "%UILANG%"=="zh" (set "TSTR=Windows 启动器 — 选择一项后按回车") else (set "TSTR=WINDOWS LAUNCHER — pick an option, then press Enter")
  exit /b 0
)
if /i "%~1"=="pick" (
  if /i "%UILANG%"=="vi" (set "TSTR=➜ Lựa chọn của bạn") else if /i "%UILANG%"=="zh" (set "TSTR=➜ 请选择") else (set "TSTR=➜ Your choice")
  exit /b 0
)
if /i "%~1"=="langhint" (
  if /i "%UILANG%"=="vi" (set "TSTR=L — đổi ngôn ngữ ^(VI/EN/中^)") else if /i "%UILANG%"=="zh" (set "TSTR=L — 切换语言 ^(VI/EN/中^)") else (set "TSTR=L — switch language ^(VI/EN/中^)")
  exit /b 0
)
if /i "%~1"=="play" (
  if /i "%UILANG%"=="vi" (set "TSTR=▶  Chơi ngay ^(Production^) — build + mở game") else if /i "%UILANG%"=="zh" (set "TSTR=▶  立即游玩（正式版）— 构建并打开游戏") else (set "TSTR=▶  Play now ^(Production^) — build + open game")
  exit /b 0
)
if /i "%~1"=="dev" (
  if /i "%UILANG%"=="vi" (set "TSTR=🛠  Dev mode — server HMR tại localhost:5173") else if /i "%UILANG%"=="zh" (set "TSTR=🛠  开发模式 — localhost:5173 HMR 服务器") else (set "TSTR=🛠  Dev mode — HMR server at localhost:5173")
  exit /b 0
)
if /i "%~1"=="build" (
  if /i "%UILANG%"=="vi" (set "TSTR=📦  Build production — tạo dist/index.html") else if /i "%UILANG%"=="zh" (set "TSTR=📦  构建正式版 — 生成 dist/index.html") else (set "TSTR=📦  Build production — create dist/index.html")
  exit /b 0
)
if /i "%~1"=="test" (
  if /i "%UILANG%"=="vi" (set "TSTR=🧪  Chạy tests — vitest") else if /i "%UILANG%"=="zh" (set "TSTR=🧪  运行测试 — vitest") else (set "TSTR=🧪  Run tests — vitest")
  exit /b 0
)
if /i "%~1"=="check" (
  if /i "%UILANG%"=="vi" (set "TSTR=✅  Kiểm tra toàn bộ — typecheck + tests + build") else if /i "%UILANG%"=="zh" (set "TSTR=✅  全面检查 — typecheck + 测试 + 构建") else (set "TSTR=✅  Full check — typecheck + tests + build")
  exit /b 0
)
if /i "%~1"=="install" (
  if /i "%UILANG%"=="vi" (set "TSTR=📥  Cài đặt dependencies — npm install") else if /i "%UILANG%"=="zh" (set "TSTR=📥  安装依赖 — npm install") else (set "TSTR=📥  Install dependencies — npm install")
  exit /b 0
)
if /i "%~1"=="clean" (
  if /i "%UILANG%"=="vi" (set "TSTR=🧹  Dọn dẹp — xoá node_modules/ và dist/") else if /i "%UILANG%"=="zh" (set "TSTR=🧹  清理 — 删除 node_modules/ 和 dist/") else (set "TSTR=🧹  Clean up — remove node_modules/ and dist/")
  exit /b 0
)
if /i "%~1"=="info" (
  if /i "%UILANG%"=="vi" (set "TSTR=ℹ️   Thông tin ^& hướng dẫn") else if /i "%UILANG%"=="zh" (set "TSTR=ℹ️   关于与帮助") else (set "TSTR=ℹ️   About ^& help")
  exit /b 0
)
if /i "%~1"=="quit" (
  if /i "%UILANG%"=="vi" (set "TSTR=🚪  Thoát") else if /i "%UILANG%"=="zh" (set "TSTR=🚪  退出") else (set "TSTR=🚪  Quit")
  exit /b 0
)
if /i "%~1"=="bye" (
  if /i "%UILANG%"=="vi" (set "TSTR=Hẹn gặp lại trong bếp! 🫙") else if /i "%UILANG%"=="zh" (set "TSTR=厨房见！🫙") else (set "TSTR=See you in the kitchen! 🫙")
  exit /b 0
)
if /i "%~1"=="badchoice" (
  if /i "%UILANG%"=="vi" (set "TSTR=Lựa chọn không hợp lệ.") else if /i "%UILANG%"=="zh" (set "TSTR=无效选择。") else (set "TSTR=Invalid choice.")
  exit /b 0
)
if /i "%~1"=="pressenter" (
  if /i "%UILANG%"=="vi" (set "TSTR=Nhấn Enter để quay lại menu…") else if /i "%UILANG%"=="zh" (set "TSTR=按回车返回菜单…") else (set "TSTR=Press Enter to return to the menu…")
  exit /b 0
)
if /i "%~1"=="nodiff" (
  if /i "%UILANG%"=="vi" (set "TSTR=✖ Không tìm thấy Node.js / npm.") else if /i "%UILANG%"=="zh" (set "TSTR=✖ 未找到 Node.js / npm。") else (set "TSTR=✖ Node.js / npm not found.")
  exit /b 0
)
if /i "%~1"=="nodehint" (
  if /i "%UILANG%"=="vi" (set "TSTR=  Cài Node LTS ^(≥ 20.19^) rồi mở lại file này:") else if /i "%UILANG%"=="zh" (set "TSTR=  请安装 Node LTS（≥ 20.19）后重新打开本文件：") else (set "TSTR=  Install Node LTS ^(≥ 20.19^), then reopen this file:")
  exit /b 0
)
if /i "%~1"=="nodeinstall" (
  if /i "%UILANG%"=="vi" (set "TSTR=    winget install OpenJS.NodeJS.LTS  hoặc  https://nodejs.org") else if /i "%UILANG%"=="zh" (set "TSTR=    winget install OpenJS.NodeJS.LTS  或  https://nodejs.org") else (set "TSTR=    winget install OpenJS.NodeJS.LTS  or  https://nodejs.org")
  exit /b 0
)
if /i "%~1"=="firstinstall" (
  if /i "%UILANG%"=="vi" (set "TSTR=➜ Chưa có node_modules — đang chạy npm install ^(chỉ lần đầu^)…") else if /i "%UILANG%"=="zh" (set "TSTR=➜ 尚无 node_modules — 正在 npm install（仅首次）…") else (set "TSTR=➜ No node_modules yet — running npm install ^(first time only^)…")
  exit /b 0
)
if /i "%~1"=="buildstart" (
  if /i "%UILANG%"=="vi" (set "TSTR=➜ Đang build bản production…") else if /i "%UILANG%"=="zh" (set "TSTR=➜ 正在构建正式版…") else (set "TSTR=➜ Building production…")
  exit /b 0
)
if /i "%~1"=="buildok" (
  if /i "%UILANG%"=="vi" (set "TSTR=✔ Build xong — đang mở game…") else if /i "%UILANG%"=="zh" (set "TSTR=✔ 构建完成 — 正在打开游戏…") else (set "TSTR=✔ Build complete — opening the game…")
  exit /b 0
)
if /i "%~1"=="buildfail" (
  if /i "%UILANG%"=="vi" (set "TSTR=✖ Build thất bại. Xem log ở trên.") else if /i "%UILANG%"=="zh" (set "TSTR=✖ 构建失败。请查看上方日志。") else (set "TSTR=✖ Build failed. See the log above.")
  exit /b 0
)
if /i "%~1"=="devextra" (
  if /i "%UILANG%"=="vi" (set "TSTR=Dev server ^(HMR^) tại http://localhost:5173 — bấm Ctrl+C để dừng.") else if /i "%UILANG%"=="zh" (set "TSTR=开发服务器 ^(HMR^) 运行于 http://localhost:5173 — 按 Ctrl+C 停止。") else (set "TSTR=Dev server ^(HMR^) at http://localhost:5173 — Ctrl+C to stop.")
  exit /b 0
)
if /i "%~1"=="checkok" (
  if /i "%UILANG%"=="vi" (set "TSTR=✔ Mọi thứ xanh!") else if /i "%UILANG%"=="zh" (set "TSTR=✔ 一切顺利！") else (set "TSTR=✔ Everything is green!")
  exit /b 0
)
if /i "%~1"=="installdone" (
  if /i "%UILANG%"=="vi" (set "TSTR=✔ Dependencies đã cài xong.") else if /i "%UILANG%"=="zh" (set "TSTR=✔ 依赖安装完成。") else (set "TSTR=✔ Dependencies installed.")
  exit /b 0
)
if /i "%~1"=="cleanknown" (
  if /i "%UILANG%"=="vi" (set "TSTR=⚠ Sẽ xoá node_modules/ và dist/ ^(không xoá mã nguồn^).") else if /i "%UILANG%"=="zh" (set "TSTR=⚠ 将删除 node_modules/ 和 dist/（不会动源码）。") else (set "TSTR=⚠ Deletes node_modules/ and dist/ ^(source untouched^).")
  exit /b 0
)
if /i "%~1"=="confirmdelete" (
  if /i "%UILANG%"=="vi" (set "TSTR=Gõ YES để xác nhận: ") else if /i "%UILANG%"=="zh" (set "TSTR=输入 YES 确认：") else (set "TSTR=Type YES to confirm: ")
  exit /b 0
)
if /i "%~1"=="cleaned" (
  if /i "%UILANG%"=="vi" (set "TSTR=✔ Đã dọn dẹp.") else if /i "%UILANG%"=="zh" (set "TSTR=✔ 已清理。") else (set "TSTR=✔ Cleaned.")
  exit /b 0
)
if /i "%~1"=="cancelled" (
  if /i "%UILANG%"=="vi" (set "TSTR=Đã huỷ.") else if /i "%UILANG%"=="zh" (set "TSTR=已取消。") else (set "TSTR=Cancelled.")
  exit /b 0
)
if /i "%~1"=="info1" (
  if /i "%UILANG%"=="vi" (set "TSTR=• Chơi ngay: build file tự chứa dist/index.html rồi mở bằng trình duyệt.") else if /i "%UILANG%"=="zh" (set "TSTR=• 游玩：构建独立 dist/index.html 后打开即可。") else (set "TSTR=• Play: build the self-contained dist/index.html and open it.")
  exit /b 0
)
if /i "%~1"=="info2" (
  if /i "%UILANG%"=="vi" (set "TSTR=• Dev: Vite HMR, sửa code thấy ngay. Cần Node ≥ 20.19.") else if /i "%UILANG%"=="zh" (set "TSTR=• 开发：Vite HMR 即时热更新。需要 Node ≥ 20.19。") else (set "TSTR=• Dev: Vite HMR, instant feedback. Needs Node ≥ 20.19.")
  exit /b 0
)
if /i "%~1"=="info3" (
  if /i "%UILANG%"=="vi" (set "TSTR=• Dữ liệu lưu cục bộ: điểm/thành tựu ^(localStorage^), không gửi đi đâu.") else if /i "%UILANG%"=="zh" (set "TSTR=• 数据均存于本地：分数/成就（localStorage），绝不上传。") else (set "TSTR=• Data is local: scores/achievements ^(localStorage^), never sent anywhere.")
  exit /b 0
)
if /i "%~1"=="author" (
  if /i "%UILANG%"=="vi" (set "TSTR=Tác giả: Standardize Paradigm ^<standardizeparadigm@donuco.com^>") else if /i "%UILANG%"=="zh" (set "TSTR=作者：Standardize Paradigm ^<standardizeparadigm@donuco.com^>") else (set "TSTR=Author: Standardize Paradigm ^<standardizeparadigm@donuco.com^>")
  exit /b 0
)
if /i "%~1"=="license" (
  if /i "%UILANG%"=="vi" (set "TSTR=Arcade muối dưa offline-first · AGPL-3.0-only") else if /i "%UILANG%"=="zh" (set "TSTR=离线优先腌菜街机 · AGPL-3.0-only") else (set "TSTR=Offline-first pickle arcade · AGPL-3.0-only")
  exit /b 0
)
set "TSTR=%~1"
exit /b 0

:pause_menu
call :T pressenter
set /p "_=%D%!TSTR!%R%"
exit /b 0

:neednode
where node >nul 2>nul || goto NONODE
where npm  >nul 2>nul || goto NONODE
exit /b 0
:NONODE
call :T nodiff & echo %CHILI%%TSTR%%R%
call :T nodehint & echo %BRINE%%TSTR%%R%
call :T nodeinstall & echo %GOLD%%TSTR%%R%
call :pause_menu
exit /b 1

:ensuredeps
if not exist node_modules (
  call :T firstinstall & echo %CYAN%%TSTR%%R%
  call npm install || ( echo %CHILI%✖ npm install failed.%R% & call :pause_menu & exit /b 1 )
)
exit /b 0

:play
call :neednode || goto menu
call :ensuredeps || goto menu
call :T buildstart & echo %GOLD%%TSTR%%R%
call npm run build
if errorlevel 1 ( call :T buildfail & echo %CHILI%%TSTR%%R% & call :pause_menu & goto menu )
call :T buildok & echo %GREEN%%TSTR%%R%
start "" "dist\index.html"
call :pause_menu
goto menu

:dev
call :neednode || goto menu
call :ensuredeps || goto menu
call :T devextra & echo %GOLD%%TSTR%%R%
call npm run dev
call :pause_menu
goto menu

:build
call :neednode || goto menu
call :ensuredeps || goto menu
call :T buildstart & echo %GOLD%%TSTR%%R%
call npm run build && echo %GREEN%✔ dist/index.html%R%
call :pause_menu
goto menu

:test
call :neednode || goto menu
call :ensuredeps || goto menu
call npm run test
call :pause_menu
goto menu

:checkall
call :neednode || goto menu
call :ensuredeps || goto menu
call npm run check
if not errorlevel 1 ( call :T checkok & echo %GREEN%%TSTR%%R% )
call :pause_menu
goto menu

:install
call :neednode || goto menu
call npm install
if not errorlevel 1 ( call :T installdone & echo %GREEN%%TSTR%%R% )
call :pause_menu
goto menu

:clean
call :T cleanknown & echo %CHILI%%TSTR%%R%
call :T confirmdelete & set /p "YN=%CHILI%%TSTR%%R%"
if /i "%YN%"=="YES" ( rmdir /s /q node_modules dist 2>nul & call :T cleaned & echo %GREEN%%TSTR%%R% ) else ( call :T cancelled & echo %D%%TSTR%%R% )
call :pause_menu
goto menu

:info
echo %BRINE%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%R%
call :T title & echo %GOLD%%B% !TSTR! %R% (v%VERSION%)
call :T license & echo %BRINE% !TSTR!%R%
call :T author & echo %BRINE% !TSTR!%R%
echo %BRINE%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%R%
call :T info1 & echo %CYAN%!TSTR!%R%
call :T info2 & echo %CYAN%!TSTR!%R%
call :T info3 & echo %CYAN%!TSTR!%R%
call :pause_menu
goto menu

:menu
cls
call :T title
echo %GOLD%%B%╔════════════════════════════════════════════╗%R%
echo %GOLD%%B%║  🫙  !TSTR!  v%VERSION%  ║%R%
echo %GOLD%%B%╚════════════════════════════════════════════╝%R%
ping -n 1 -w 70 127.0.0.1 >nul
cls
echo %GOLD2%%B%╔════════════════════════════════════════════╗%R%
echo %GOLD2%%B%║  🫙  !TSTR!  v%VERSION%  ║%R%
echo %GOLD2%%B%╚════════════════════════════════════════════╝%R%
ping -n 1 -w 70 127.0.0.1 >nul
cls
echo %PINK%%B%╔════════════════════════════════════════════╗%R%
echo %PINK%%B%║  🫙  !TSTR!  v%VERSION%  ║%R%
echo %PINK%%B%╚════════════════════════════════════════════╝%R%
call :T subtitle & echo %JADE%  !TSTR!%R%
echo.
call :T play   & echo %GOLD%  1)%R% !TSTR!
call :T dev    & echo %GOLD%  2)%R% !TSTR!
call :T build  & echo %GOLD%  3)%R% !TSTR!
call :T test   & echo %GOLD%  4)%R% !TSTR!
call :T check  & echo %GOLD%  5)%R% !TSTR!
call :T install& echo %GOLD%  6)%R% !TSTR!
call :T clean  & echo %GOLD%  7)%R% !TSTR!
call :T info   & echo %GOLD%  8)%R% !TSTR!
call :T quit   & echo %GOLD%  0)%R% !TSTR!    
call :T langhint
echo %D%     !TSTR!%R%
echo %D%  ✦ ·˚ ·✦ ·˚ ·✦ ·˚ ·✦ ·˚ ·✦ ·˚ ·✦ ·˚ ·✦ ·˚ ·✦  %R%
echo.
call :T pick & set /p "opt=%BRINE%!TSTR!: %R%"
if "%opt%"=="1" goto play
if "%opt%"=="2" goto dev
if "%opt%"=="3" goto build
if "%opt%"=="4" goto test
if "%opt%"=="5" goto checkall
if "%opt%"=="6" goto install
if "%opt%"=="7" goto clean
if "%opt%"=="8" goto info
if /i "%opt%"=="L" (
  if /i "%UILANG%"=="vi" (set "UILANG=en") else if /i "%UILANG%"=="en" (set "UILANG=zh") else (set "UILANG=vi")
  goto menu
)
if "%opt%"=="0" goto bye
call :T badchoice & echo %CHILI%!TSTR!%R%
call :pause_menu
goto menu

:bye
call :T bye & echo %GOLD%!TSTR!%R%
exit /b 0
