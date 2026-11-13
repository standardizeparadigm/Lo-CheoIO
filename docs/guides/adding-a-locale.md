# Thêm ngôn ngữ mới vào game (hoặc sửa dịch)

7 locale hiện có: `vi` (source of truth) · `en` · `zh` · `ja` · `ko` · `es` · `fr`.

## Các bước

1. **Copy `src/i18n/locales/vi.ts`** → `src/i18n/locales/<lang>.ts`, dịch toàn bộ value (không đổi key, không đổi thứ tự).
2. Đăng ký trong `src/i18n/i18n.ts`: thêm vào `LANGUAGES`, `detectInitialLanguage()` (prefix trình duyệt), `numberLocale()` nếu cần locale số riêng.
3. Thêm vào `LanguageSwitcher.tsx` danh sách hiển thị (chữ ngắn gọn: `VI · EN · …`).
4. Chạy `npm run check` — parity test sẽ **fail** nếu thiếu key nào.
5. Cập nhật docs: README (10 ngôn ngữ + mục languages), `docs/DESCRIPTION.md`, launcher (nếu muốn menu launcher dịch theo).

## Quy tắc dịch

- **Giữ nguyên placeholder** `{mode}` `{score}` `{jars}` `{n}` `{total}` `{name}` — parity test ép khớp với bản VI (xem `tests/i18n-v115.test.ts`).
- **Tone**: arcade Việt — hài hước, mộc mạc; tránh trang trọng kiểu hành chính.
- **Tên mode giữ nguyên** tên riêng (MUỐI DƯA CỔ ĐIỂN…), dịch phần mô tả/tagline.
- **Tiếng Việt có dấu đầy đủ** — tuyệt đối không bỏ dấu.
- Key mới → thêm vào **tất cả** 7 locale cùng commit (tests ép đồng bộ).

## Kiểm thử nhanh

```bash
npx vitest run tests/i18n.test.ts tests/i18n-v115.test.ts
```
