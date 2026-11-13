# Quy trình phát hành một phiên bản (rút từ v1.1.5)

## Checklist

1. **Scope lock** — liệt kê tính năng/bugfix; cái nào "giữ nguyên" thì ghi rõ là giữ.
2. **Code + tests** — tính năng lõi (pure logic) phải có unit test; `npm run check` xanh liên tục.
3. **i18n** — key mới thêm đồng thời vào **7 locale** cùng commit; parity test ép đồng bộ.
4. **Version bump đa điểm** — `package.json` + lock · `src/version.ts` · `scripts/play-*` (bat giữ CRLF+BOM!) · `assets/banner.svg` · README ×10 (badge + tree + releases row + what's-new) · `.github` nếu cần.
5. **CHANGELOG.md** — mục `[x.y.z] — date` (Keep a Changelog), newest-first; link `[x.y.z]: …/releases/tag/vx.y.z` cuối file.
6. **Release notes** — `docs/releases/vx.y.z.md`: ngày, tác giả, TL;DR, Highlights, Added/Fixed (kèm **nguyên nhân gốc**), Changed, verification matrix, migration notes.
7. **Docs đồng bộ** — DESCRIPTION, CONTRIBUTING, scripts/README, trees, test counts.
8. **Smoke** — `npx vite-node scripts/smoke-ssr.tsx` (headless render) khi có UI mới.
9. **PR** — một nhánh `arena/<id>` → base `main`; **user merge**, không tự merge.

## Anti-patterns (học từ lịch sử)

- Đừng để "releases table ở README" trỏ sai version — badge link và bảng phải khớp `APP_VERSION`.
- Đừng sửa historical release notes (ngày/claimed features giữ nguyên trừ lỗi fact-sai nghiêm trọng).
- Đừng bump docs mà quên launcher/banner — chúng không đọc `APP_VERSION` (ngoài bundle).
- Test count phải khớp thực tế (`npx vitest run` đếm hộ) — v1.1.5 từng lệch 72 vs 76 suốt 2 commit trước khi sửa.
