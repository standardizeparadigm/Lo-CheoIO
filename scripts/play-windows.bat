@echo off
chcp 65001 >nul
rem =====================================================================
rem  LỌ CHÉO - HŨ DƯA ĐẠI CHIẾN - Trình chạy cho Windows
rem  Đa ngôn ngữ: Tiếng Việt (gốc, có dấu) - English - 中文 - 日本語 - 한국어
rem  Tự nhận theo %LOCHEO_LANG% hoặc mặc định Tiếng Việt.
rem  Nhấn đúp để mở menu tương tác nhiều màu có hoạt ảnh.
rem  Mọi chuỗi hiển thị viết ngoài dòng, cú pháp lệnh dùng ASCII thuần.
rem =====================================================================
setlocal EnableDelayedExpansion
cd /d "%~dp0.." || exit /b 1

rem ---------- Màu ANSI: chỉ bật khi chạy trong Windows Terminal / ANSICON / Git-bash ----------
if defined WT_SESSION set "USE_COLOR=1"
if defined ANSICON set "USE_COLOR=1"
if defined LOCHEO_FORCE_COLOR set "USE_COLOR=1"
if /i "%TERM%"=="xterm" set "USE_COLOR=1"
set "R=" & set "B=" & set "D="
set "GOLD=" & set "GOLD2=" & set "JADE=" & set "CHILI=" & set "PINK="
set "BRINE=" & set "GREEN=" & set "CYAN=" & set "RED="
if defined USE_COLOR (
  set "R=[0m" & set "B=[1m" & set "D=[2m"
  set "GOLD=[38;5;220m" & set "GOLD2=[38;5;228m" & set "PINK=[38;5;218m" & set "JADE=[38;5;79m" & set "CHILI=[38;5;203m"
  set "BRINE=[38;5;159m" & set "GREEN=[38;5;114m" & set "CYAN=[38;5;116m" & set "RED=[38;5;203m"
)
set "VERSION=1.1.4"

rem ---------- Ngôn ngữ: LOCHEO_LANG=vi/en/zh/ja/ko, mặc định vi ----------
set "UILANG=%LOCHEO_LANG%"
if "%UILANG%"=="" set "UILANG=vi"

rem ---------- Bảng chuỗi đa ngôn ngữ: VI gốc - EN - ZH - JA - KO ----------
:T
set "TSTR=%~2"
if /i "%~1"=="title" (
  if /i "%UILANG%"=="vi" (set "TSTR=LỌ CHÉO - HŨ DƯA ĐẠI CHIẾN") else if /i "%UILANG%"=="en" (set "TSTR=LỌ CHÉO - PICKLED JAR SHOWDOWN") else if /i "%UILANG%"=="zh" (set "TSTR=LỌ CHÉO - 腌罐大乱斗") else if /i "%UILANG%"=="ja" (set "TSTR=LỌ CHÉO - 漬物壺大戦争") else (set "TSTR=LỌ CHÉO - 절임항아리 대격전")
  exit /b 0
)
if /i "%~1"=="subtitle" (
  if /i "%UILANG%"=="vi" (set "TSTR=TRÌNH CHẠY WINDOWS - chọn một mục rồi nhấn Enter") else if /i "%UILANG%"=="en" (set "TSTR=WINDOWS LAUNCHER - pick an option, then press Enter") else if /i "%UILANG%"=="zh" (set "TSTR=Windows 启动器 - 选择一项后按回车") else if /i "%UILANG%"=="ja" (set "TSTR=WINDOWS ランチャー - 項目を選んで Enter を押してください") else (set "TSTR=WINDOWS 런처 - 항목을 선택하고 Enter를 누르세요")
  exit /b 0
)
if /i "%~1"=="pick" (
  if /i "%UILANG%"=="vi" (set "TSTR=Lựa chọn của bạn") else if /i "%UILANG%"=="en" (set "TSTR=Your choice") else if /i "%UILANG%"=="zh" (set "TSTR=请选择") else if /i "%UILANG%"=="ja" (set "TSTR=選択してください") else (set "TSTR=선택하세요")
  exit /b 0
)
if /i "%~1"=="langhint" (
  if /i "%UILANG%"=="vi" (set "TSTR=L - đổi ngôn ngữ: VI/EN/中/日/한") else if /i "%UILANG%"=="en" (set "TSTR=L - switch language: VI/EN/中/日/한") else if /i "%UILANG%"=="zh" (set "TSTR=L - 切换语言: VI/EN/中/日/한") else if /i "%UILANG%"=="ja" (set "TSTR=L - 言語切替: VI/EN/中/日/한") else (set "TSTR=L - 언어 전환: VI/EN/中/日/한")
  exit /b 0
)
if /i "%~1"=="play" (
  if /i "%UILANG%"=="vi" (set "TSTR=Chơi ngay - build và mở game") else if /i "%UILANG%"=="en" (set "TSTR=Play now - build and open the game") else if /i "%UILANG%"=="zh" (set "TSTR=立即游玩 - 构建并打开游戏") else if /i "%UILANG%"=="ja" (set "TSTR=今すぐプレイ - ビルドしてゲームを開く") else (set "TSTR=바로 플레이 - 빌드 후 게임 열기")
  exit /b 0
)
if /i "%~1"=="dev" (
  if /i "%UILANG%"=="vi" (set "TSTR=Dev mode - server HMR tại localhost:5173") else if /i "%UILANG%"=="en" (set "TSTR=Dev mode - HMR server at localhost:5173") else if /i "%UILANG%"=="zh" (set "TSTR=开发模式 - localhost:5173 HMR 服务器") else if /i "%UILANG%"=="ja" (set "TSTR=開発モード - localhost:5173 の HMR サーバー") else (set "TSTR=개발 모드 - localhost:5173 HMR 서버")
  exit /b 0
)
if /i "%~1"=="build" (
  if /i "%UILANG%"=="vi" (set "TSTR=Build production - tạo dist/index.html") else if /i "%UILANG%"=="en" (set "TSTR=Build production - create dist/index.html") else if /i "%UILANG%"=="zh" (set "TSTR=构建正式版 - 生成 dist/index.html") else if /i "%UILANG%"=="ja" (set "TSTR=本番ビルド - dist/index.html を生成") else (set "TSTR=프로덕션 빌드 - dist/index.html 생성")
  exit /b 0
)
if /i "%~1"=="test" (
  if /i "%UILANG%"=="vi" (set "TSTR=Chạy tests - vitest") else if /i "%UILANG%"=="en" (set "TSTR=Run tests - vitest") else if /i "%UILANG%"=="zh" (set "TSTR=运行测试 - vitest") else if /i "%UILANG%"=="ja" (set "TSTR=テストを実行 - vitest") else (set "TSTR=테스트 실행 - vitest")
  exit /b 0
)
if /i "%~1"=="check" (
  if /i "%UILANG%"=="vi" (set "TSTR=Kiểm tra toàn bộ - typecheck + tests + build") else if /i "%UILANG%"=="en" (set "TSTR=Full check - typecheck + tests + build") else if /i "%UILANG%"=="zh" (set "TSTR=全面检查 - typecheck + 测试 + 构建") else if /i "%UILANG%"=="ja" (set "TSTR=総合チェック - typecheck + テスト + ビルド") else (set "TSTR=전체 검사 - typecheck + 테스트 + 빌드")
  exit /b 0
)
if /i "%~1"=="install" (
  if /i "%UILANG%"=="vi" (set "TSTR=Cài đặt dependencies - npm install") else if /i "%UILANG%"=="en" (set "TSTR=Install dependencies - npm install") else if /i "%UILANG%"=="zh" (set "TSTR=安装依赖 - npm install") else if /i "%UILANG%"=="ja" (set "TSTR=依存関係をインストール - npm install") else (set "TSTR=의존성 설치 - npm install")
  exit /b 0
)
if /i "%~1"=="clean" (
  if /i "%UILANG%"=="vi" (set "TSTR=Dọn dẹp - xoá node_modules/ và dist/") else if /i "%UILANG%"=="en" (set "TSTR=Clean up - remove node_modules/ and dist/") else if /i "%UILANG%"=="zh" (set "TSTR=清理 - 删除 node_modules/ 和 dist/") else if /i "%UILANG%"=="ja" (set "TSTR=クリーンアップ - node_modules/ と dist/ を削除") else (set "TSTR=정리 - node_modules/ 및 dist/ 삭제")
  exit /b 0
)
if /i "%~1"=="info" (
  if /i "%UILANG%"=="vi" (set "TSTR=Thông tin và hướng dẫn") else if /i "%UILANG%"=="en" (set "TSTR=About and help") else if /i "%UILANG%"=="zh" (set "TSTR=关于与帮助") else if /i "%UILANG%"=="ja" (set "TSTR=情報とヘルプ") else (set "TSTR=정보 및 도움말")
  exit /b 0
)
if /i "%~1"=="quit" (
  if /i "%UILANG%"=="vi" (set "TSTR=Thoát") else if /i "%UILANG%"=="en" (set "TSTR=Quit") else if /i "%UILANG%"=="zh" (set "TSTR=退出") else if /i "%UILANG%"=="ja" (set "TSTR=終了") else (set "TSTR=종료")
  exit /b 0
)
if /i "%~1"=="bye" (
  if /i "%UILANG%"=="vi" (set "TSTR=Hẹn gặp lại trong bếp. 🫙") else if /i "%UILANG%"=="en" (set "TSTR=See you in the kitchen. 🫙") else if /i "%UILANG%"=="zh" (set "TSTR=厨房见。🫙") else if /i "%UILANG%"=="ja" (set "TSTR=また台所で。🫙") else (set "TSTR=또 만나요. 🫙")
  exit /b 0
)
if /i "%~1"=="badchoice" (
  if /i "%UILANG%"=="vi" (set "TSTR=Lựa chọn không hợp lệ.") else if /i "%UILANG%"=="en" (set "TSTR=Invalid choice.") else if /i "%UILANG%"=="zh" (set "TSTR=无效选择。") else if /i "%UILANG%"=="ja" (set "TSTR=無効な選択です。") else (set "TSTR=잘못된 선택입니다.")
  exit /b 0
)
if /i "%~1"=="pressenter" (
  if /i "%UILANG%"=="vi" (set "TSTR=Nhấn Enter để quay lại menu...") else if /i "%UILANG%"=="en" (set "TSTR=Press Enter to return to the menu...") else if /i "%UILANG%"=="zh" (set "TSTR=按回车返回菜单...") else if /i "%UILANG%"=="ja" (set "TSTR=Enter を押してメニューに戻る...") else (set "TSTR=Enter를 눌러 메뉴로 돌아가기...")
  exit /b 0
)
if /i "%~1"=="nodiff" (
  if /i "%UILANG%"=="vi" (set "TSTR=Không tìm thấy Node.js / npm.") else if /i "%UILANG%"=="en" (set "TSTR=Node.js / npm not found.") else if /i "%UILANG%"=="zh" (set "TSTR=未找到 Node.js / npm。") else if /i "%UILANG%"=="ja" (set "TSTR=Node.js / npm が見つかりません。") else (set "TSTR=Node.js / npm을 찾을 수 없습니다.")
  exit /b 0
)
if /i "%~1"=="nodehint" (
  if /i "%UILANG%"=="vi" (set "TSTR=Cài Node LTS >= 20.19 rồi mở lại file này:") else if /i "%UILANG%"=="en" (set "TSTR=Install Node LTS >= 20.19, then reopen this file:") else if /i "%UILANG%"=="zh" (set "TSTR=请安装 Node LTS >= 20.19 后重新打开本文件:") else if /i "%UILANG%"=="ja" (set "TSTR=Node LTS >= 20.19 をインストールして、このファイルを開き直してください:") else (set "TSTR=Node LTS >= 20.19를 설치한 후 이 파일을 다시 여세요:")
  exit /b 0
)
if /i "%~1"=="nodeinstall" (
  if /i "%UILANG%"=="vi" (set "TSTR=winget install OpenJS.NodeJS.LTS  hoặc  https://nodejs.org") else if /i "%UILANG%"=="en" (set "TSTR=winget install OpenJS.NodeJS.LTS  or  https://nodejs.org") else if /i "%UILANG%"=="zh" (set "TSTR=winget install OpenJS.NodeJS.LTS  或  https://nodejs.org") else if /i "%UILANG%"=="ja" (set "TSTR=winget install OpenJS.NodeJS.LTS  または  https://nodejs.org") else (set "TSTR=winget install OpenJS.NodeJS.LTS  또는  https://nodejs.org")
  exit /b 0
)
if /i "%~1"=="firstinstall" (
  if /i "%UILANG%"=="vi" (set "TSTR=Chưa có node_modules - đang chạy npm install, chỉ lần đầu...") else if /i "%UILANG%"=="en" (set "TSTR=No node_modules yet - running npm install, first time only...") else if /i "%UILANG%"=="zh" (set "TSTR=尚无 node_modules - 正在 npm install, 仅首次...") else if /i "%UILANG%"=="ja" (set "TSTR=node_modules がありません - npm install を実行中, 初回のみ...") else (set "TSTR=node_modules가 없습니다 - npm install 실행 중, 최초 1회만...")
  exit /b 0
)
if /i "%~1"=="buildstart" (
  if /i "%UILANG%"=="vi" (set "TSTR=Đang build bản production...") else if /i "%UILANG%"=="en" (set "TSTR=Building production...") else if /i "%UILANG%"=="zh" (set "TSTR=正在构建正式版...") else if /i "%UILANG%"=="ja" (set "TSTR=本番ビルド中...") else (set "TSTR=프로덕션 빌드 중...")
  exit /b 0
)
if /i "%~1"=="buildok" (
  if /i "%UILANG%"=="vi" (set "TSTR=Build xong - đang mở game.") else if /i "%UILANG%"=="en" (set "TSTR=Build complete - opening the game.") else if /i "%UILANG%"=="zh" (set "TSTR=构建完成 - 正在打开游戏.") else if /i "%UILANG%"=="ja" (set "TSTR=ビルド完了 - ゲームを開きます.") else (set "TSTR=빌드 완료 - 게임을 여는 중.")
  exit /b 0
)
if /i "%~1"=="buildfail" (
  if /i "%UILANG%"=="vi" (set "TSTR=Build thất bại. Xem log ở trên.") else if /i "%UILANG%"=="en" (set "TSTR=Build failed. See the log above.") else if /i "%UILANG%"=="zh" (set "TSTR=构建失败。请查看上方日志。") else if /i "%UILANG%"=="ja" (set "TSTR=ビルドに失敗しました. 上のログを確認してください.") else (set "TSTR=빌드 실패. 위의 로그를 확인하세요.")
  exit /b 0
)
if /i "%~1"=="devextra" (
  if /i "%UILANG%"=="vi" (set "TSTR=Dev server HMR tại http://localhost:5173 - bấm Ctrl+C để dừng.") else if /i "%UILANG%"=="en" (set "TSTR=Dev server HMR at http://localhost:5173 - Ctrl+C to stop.") else if /i "%UILANG%"=="zh" (set "TSTR=开发服务器 HMR 运行于 http://localhost:5173 - 按 Ctrl+C 停止.") else if /i "%UILANG%"=="ja" (set "TSTR=開発サーバー HMR は http://localhost:5173 - Ctrl+C で停止.") else (set "TSTR=개발 서버 HMR: http://localhost:5173 - Ctrl+C로 중지.")
  exit /b 0
)
if /i "%~1"=="checkok" (
  if /i "%UILANG%"=="vi" (set "TSTR=Mọi thứ đều xanh.") else if /i "%UILANG%"=="en" (set "TSTR=Everything is green.") else if /i "%UILANG%"=="zh" (set "TSTR=一切顺利.") else if /i "%UILANG%"=="ja" (set "TSTR=すべてグリーン.") else (set "TSTR=모든 항목 그린.")
  exit /b 0
)
if /i "%~1"=="installdone" (
  if /i "%UILANG%"=="vi" (set "TSTR=Dependencies đã cài xong.") else if /i "%UILANG%"=="en" (set "TSTR=Dependencies installed.") else if /i "%UILANG%"=="zh" (set "TSTR=依赖安装完成.") else if /i "%UILANG%"=="ja" (set "TSTR=依存関係のインストールが完了しました.") else (set "TSTR=의존성 설치 완료.")
  exit /b 0
)
if /i "%~1"=="cleanknown" (
  if /i "%UILANG%"=="vi" (set "TSTR=Sẽ xoá node_modules/ và dist/, không xoá mã nguồn.") else if /i "%UILANG%"=="en" (set "TSTR=Deletes node_modules/ and dist/, source untouched.") else if /i "%UILANG%"=="zh" (set "TSTR=将删除 node_modules/ 和 dist/, 不会动源码.") else if /i "%UILANG%"=="ja" (set "TSTR=node_modules/ と dist/ を削除します, ソースはそのまま.") else (set "TSTR=node_modules/와 dist/를 삭제합니다. 소스는 그대로입니다.")
  exit /b 0
)
if /i "%~1"=="confirmdelete" (
  if /i "%UILANG%"=="vi" (set "TSTR=Gõ YES để xác nhận: ") else if /i "%UILANG%"=="en" (set "TSTR=Type YES to confirm: ") else if /i "%UILANG%"=="zh" (set "TSTR=输入 YES 确认: ") else if /i "%UILANG%"=="ja" (set "TSTR=確認のため YES と入力: ") else (set "TSTR=확인하려면 YES 입력: ")
  exit /b 0
)
if /i "%~1"=="cleaned" (
  if /i "%UILANG%"=="vi" (set "TSTR=Đã dọn dẹp.") else if /i "%UILANG%"=="en" (set "TSTR=Cleaned.") else if /i "%UILANG%"=="zh" (set "TSTR=已清理。") else if /i "%UILANG%"=="ja" (set "TSTR=クリーンアップ完了.") else (set "TSTR=정리 완료.")
  exit /b 0
)
if /i "%~1"=="cancelled" (
  if /i "%UILANG%"=="vi" (set "TSTR=Đã huỷ.") else if /i "%UILANG%"=="en" (set "TSTR=Cancelled.") else if /i "%UILANG%"=="zh" (set "TSTR=已取消。") else if /i "%UILANG%"=="ja" (set "TSTR=キャンセルしました.") else (set "TSTR=취소되었습니다.")
  exit /b 0
)
if /i "%~1"=="info1" (
  if /i "%UILANG%"=="vi" (set "TSTR=Chơi ngay: build dist/index.html rồi mở bằng trình duyệt.") else if /i "%UILANG%"=="en" (set "TSTR=Play: build dist/index.html and open it in the browser.") else if /i "%UILANG%"=="zh" (set "TSTR=游玩: 构建 dist/index.html 后打开即可.") else if /i "%UILANG%"=="ja" (set "TSTR=プレイ: dist/index.html をビルドしてブラウザで開く.") else (set "TSTR=플레이: dist/index.html 빌드 후 브라우저로 열기.")
  exit /b 0
)
if /i "%~1"=="info2" (
  if /i "%UILANG%"=="vi" (set "TSTR=Dev: Vite HMR, sửa code thấy ngay. Cần Node >= 20.19.") else if /i "%UILANG%"=="en" (set "TSTR=Dev: Vite HMR, instant feedback. Needs Node >= 20.19.") else if /i "%UILANG%"=="zh" (set "TSTR=开发: Vite HMR 即时热更新。需要 Node >= 20.19。") else if /i "%UILANG%"=="ja" (set "TSTR=開発: Vite HMR で即時反映. Node >= 20.19 が必要.") else (set "TSTR=개발: Vite HMR 즉시 반영. Node >= 20.19 필요.")
  exit /b 0
)
if /i "%~1"=="info3" (
  if /i "%UILANG%"=="vi" (set "TSTR=Dữ liệu lưu cục bộ: điểm và thành tựu, không gửi đi đâu. localStorage.") else if /i "%UILANG%"=="en" (set "TSTR=Data stays local: scores and achievements, never sent anywhere. localStorage.") else if /i "%UILANG%"=="zh" (set "TSTR=数据均存于本地: 分数和成就, 绝不上传. localStorage.") else if /i "%UILANG%"=="ja" (set "TSTR=データはローカル保存: スコアと実績, 送信されません. localStorage.") else (set "TSTR=데이터는 로컬 저장: 점수와 업적, 어디로도 전송되지 않습니다. localStorage.")
  exit /b 0
)
if /i "%~1"=="author" (
  if /i "%UILANG%"=="vi" (set "TSTR=Tác giả: Standardize Paradigm [standardizeparadigm@donuco.com]") else if /i "%UILANG%"=="en" (set "TSTR=Author: Standardize Paradigm [standardizeparadigm@donuco.com]") else if /i "%UILANG%"=="zh" (set "TSTR=作者: Standardize Paradigm [standardizeparadigm@donuco.com]") else if /i "%UILANG%"=="ja" (set "TSTR=作者: Standardize Paradigm [standardizeparadigm@donuco.com]") else (set "TSTR=저자: Standardize Paradigm [standardizeparadigm@donuco.com]")
  exit /b 0
)
if /i "%~1"=="license" (
  if /i "%UILANG%"=="vi" (set "TSTR=Arcade muối dưa offline-first - AGPL-3.0-only") else if /i "%UILANG%"=="en" (set "TSTR=Offline-first pickle arcade - AGPL-3.0-only") else if /i "%UILANG%"=="zh" (set "TSTR=离线优先腌菜街机 - AGPL-3.0-only") else if /i "%UILANG%"=="ja" (set "TSTR=オフライン・ピックルアーケード - AGPL-3.0-only") else (set "TSTR=오프라인 피클 아케이드 - AGPL-3.0-only")
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
where npm >nul 2>nul || goto NONODE
exit /b 0
:NONODE
call :T nodiff & echo %CHILI%!TSTR!%R%
call :T nodehint & echo %BRINE%!TSTR!%R%
call :T nodeinstall & echo %GOLD%!TSTR!%R%
call :pause_menu
exit /b 1

:ensuredeps
if not exist node_modules (
  call :T firstinstall & echo %CYAN%!TSTR!%R%
  call npm install || ( echo %CHILI%npm install failed.%R% & call :pause_menu & exit /b 1 )
)
exit /b 0

:play
call :neednode || goto menu
call :ensuredeps || goto menu
call :T buildstart & echo %GOLD%!TSTR!%R%
call npm run build
if errorlevel 1 ( call :T buildfail & echo %CHILI%!TSTR!%R% & call :pause_menu & goto menu )
call :T buildok & echo %GREEN%!TSTR!%R%
start "" "dist\index.html"
call :pause_menu
goto menu

:dev
call :neednode || goto menu
call :ensuredeps || goto menu
call :T devextra & echo %GOLD%!TSTR!%R%
call npm run dev
call :pause_menu
goto menu

:build
call :neednode || goto menu
call :ensuredeps || goto menu
call :T buildstart & echo %GOLD%!TSTR!%R%
call npm run build && echo %GREEN%dist/index.html%R%
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
if not errorlevel 1 ( call :T checkok & echo %GREEN%!TSTR!%R% )
call :pause_menu
goto menu

:install
call :neednode || goto menu
call npm install
if not errorlevel 1 ( call :T installdone & echo %GREEN%!TSTR!%R% )
call :pause_menu
goto menu

:clean
call :T cleanknown & echo %CHILI%!TSTR!%R%
call :T confirmdelete & set /p "YN=%CHILI%!TSTR!%R%"
if /i "%YN%"=="YES" ( rmdir /s /q node_modules dist 2>nul & call :T cleaned & echo %GREEN%!TSTR!%R% ) else ( call :T cancelled & echo %D%!TSTR!%R% )
call :pause_menu
goto menu

:info
echo %BRINE%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%R%
call :T title & echo %GOLD%%B% !TSTR!  v%VERSION% %R%
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
  if /i "%UILANG%"=="vi" (set "UILANG=en") else if /i "%UILANG%"=="en" (set "UILANG=zh") else if /i "%UILANG%"=="zh" (set "UILANG=ja") else if /i "%UILANG%"=="ja" (set "UILANG=ko") else (set "UILANG=vi")
  goto menu
)
if "%opt%"=="0" goto bye
call :T badchoice & echo %CHILI%!TSTR!%R%
call :pause_menu
goto menu

:bye
call :T bye & echo %GOLD%!TSTR!%R%
exit /b 0
