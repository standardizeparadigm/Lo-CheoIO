# `menu/layout` — không gian của màn hình bắt đầu

Bốn file, một việc: **quyết định màn hình bắt đầu cao bao nhiêu, và phần nào
được phép chiếm chỗ nào.**

| File | Nội dung |
| --- | --- |
| `metrics.ts` | Hằng số đo được — chiều cao một dòng menu (34), header panel (22), ticker (55), panel cao nhất (293) |
| `fit.ts` | Hàm thuần quyết định bố cục: `planMenuLayout()`, `cornerLayoutFor()`, `isCompactHeight()` |
| `index.ts` | Barrel |

## Vì sao tách riêng

v1.1.7 để hàng panel góc là **flex sibling `shrink-0`** của scene. Ở cửa sổ
1280×720, hàng đó cao **415px** và ticker **55px**, nên scene chỉ còn **250px**
— chữ CHÉO và chú lọ bị cắt ngang bởi một đường may vô hình ở `y≈247`.

Tách số ra khỏi JSX cho phép `tests/menu-layout.test.ts` chứng minh bằng phép
tính rằng tổng các phần **không vượt quá chiều cao cửa sổ**, thay vì phải mở
trình duyệt đo.

## Quy tắc bất di bất dịch

1. Panel góc và ticker **nổi trên scene** (`absolute`), không nằm trong luồng.
2. Scene **giữ chỗ** bằng `padding-bottom: cornerRowReserve()` để nội dung
   không bao giờ chui xuống dưới hàng nổi.
3. Dưới 480px, hai panel **xếp dọc** thay vì đè lên nhau (208 + 224 > 375).
4. Dưới 720px chiều cao, dòng menu **bỏ hint** (34px → 24px) để vẫn đủ chỗ.

Đổi bất kỳ con số nào ở `metrics.ts` thì phải chạy lại `npm run check` — test
`menu-layout` đối chiếu từng hằng số với class Tailwind tương ứng trong
`StartScreen.tsx`.
