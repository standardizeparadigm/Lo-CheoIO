@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion
cd /d "%~dp0.." || exit /b 1

rem ---------- ANSI colors (works on Windows 10/11 Terminal & cmd) ----------
set "R=[0m" & set "B=[1m" & set "D=[2m"
set "GOLD=[38;5;220m" & set "JADE=[38;5;79m" & set "CHILI=[38;5;203m"
set "BRINE=[38;5;159m" & set "GREEN=[38;5;114m" & set "CYAN=[38;5;116m"

:menu
cls
echo.
echo %GOLD%%B%╔════════════════════════════════════════════╗%R%
echo %GOLD%%B%║   🫙  LO CHEO — HU DUA DAI CHIEN  v1.1.2   ║%R%
echo %GOLD%%B%╚════════════════════════════════════════════╝%R%
echo %JADE%  TRINH CHAY WINDOWS — chon muc roi nhan Enter%R%
echo.
echo %GOLD%  1)%R% ^>  %B%Choi ngay (Production)%R% — build + mo game
echo %GOLD%  2)%R% *  %B%Dev mode%R% — server HMR tai localhost:5173
echo %GOLD%  3)%R% #  %B%Build production%R% — tao dist\index.html
echo %GOLD%  4)%R% +  %B%Chay tests%R% — vitest
echo %GOLD%  5)%R% =  %B%Kiem tra toan bo%R% — typecheck + tests + build
echo %GOLD%  6)%R% v  %B%Cai dat dependencies%R% — npm install
echo %GOLD%  7)%R% x  %B%Don dep%R% — xoa node_modules\ va dist\
echo %GOLD%  8)%R% i  %B%Thong tin ^& huong dan%R%
echo %GOLD%  0)%R% q  %B%Thoat%R%
echo.
set "opt="
set /p opt=%BRINE%^> Lua chon cua ban: %R%
if "%opt%"=="1" goto play
if "%opt%"=="2" goto dev
if "%opt%"=="3" goto build
if "%opt%"=="4" goto test
if "%opt%"=="5" goto checkall
if "%opt%"=="6" goto install
if "%opt%"=="7" goto clean
if "%opt%"=="8" goto info
if "%opt%"=="0" goto bye
echo %CHILI%Lua chon khong hop le.%R%
pause
goto menu

:neednode
where node >nul 2>nul || goto NONODE
where npm  >nul 2>nul || goto NONODE
exit /b 0

:NONODE
echo %CHILI%✖ Khong tim thay Node.js / npm.%R%
echo %BRINE%  Cai Node LTS (≥ 20.19) roi mo lai file nay:%R%
echo %GOLD%    winget install OpenJS.NodeJS.LTS%R%  hoac  https://nodejs.org
pause
exit /b 1

:ensuredeps
if not exist node_modules (
  echo %CYAN%Chua co node_modules — dang chay npm install ^(chi lan dau^)…%R%
  call npm install || ( echo %CHILI%✖ npm install that bai.%R% & pause & exit /b 1 )
)
exit /b 0

:play
call :neednode || goto menu
call :ensuredeps || goto menu
echo %GOLD%➜ Dang build ban production…%R%
call npm run build || ( echo %CHILI%✖ Build that bai. Xem log o tren.%R% & pause & goto menu )
echo %GREEN%✔ Build xong — dang mo game…%R%
start "" "dist\index.html"
pause
goto menu

:dev
call :neednode || goto menu
call :ensuredeps || goto menu
echo %GOLD%➜ Dev server (HMR) tai http://localhost:5173 — bam Ctrl+C de dung.%R%
call npm run dev
pause
goto menu

:build
call :neednode || goto menu
call :ensuredeps || goto menu
call npm run build && echo %GREEN%✔ dist\index.html san sang.%R%
pause
goto menu

:test
call :neednode || goto menu
call :ensuredeps || goto menu
call npm run test
pause
goto menu

:checkall
call :neednode || goto menu
call :ensuredeps || goto menu
call npm run check && echo %GREEN%✔ Moi thu xanh!%R%
pause
goto menu

:install
call :neednode || goto menu
call npm install && echo %GREEN%✔ Dependencies da cai xong.%R%
pause
goto menu

:clean
echo %CHILI%⚠ Se xoa node_modules\ va dist\ (khong xoa ma nguon).%R%
set "yn="
set /p yn=%CHILI%Go YES de xac nhan: %R%
if /i "%yn%"=="YES" ( rmdir /s /q node_modules 2>nul & rmdir /s /q dist 2>nul & echo %GREEN%✔ Da don dep.%R% ) else ( echo %D%Da huy.%R% )
pause
goto menu

:info
echo %BRINE%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%R%
echo %GOLD%%B% LO CHEO — HU DUA DAI CHIEN%R%  (v1.1.2)
echo %BRINE% Arcade muon dua offline-first · AGPL-3.0-only%R%
echo %BRINE% Tac gia: Standardize Paradigm ^<standardizeparadigm@donuco.com^>%R%
echo %BRINE%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%R%
echo %CYAN%• Choi ngay: build file tu chua dist\index.html roi mo bang trinh duyet.%R%
echo %CYAN%• Dev: Vite HMR, sua code thay ngay. Can Node ≥ 20.19.%R%
echo %CYAN%• Du lieu luu cuc bo: diem/thanh tuu (localStorage), khong gui di dau.%R%
pause
goto menu

:bye
echo %GOLD%Hen gap lai trong bep! 🫙%R%
exit /b 0
