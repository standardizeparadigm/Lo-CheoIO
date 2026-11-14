# Bố cục thích nghi — hợp đồng giữa plan và hero

Tài liệu này mô tả **hợp đồng** giữa `menu/layout/` (nơi tính toán) và
`menu/adaptive/` (nơi quyết định hiển thị). Vòng 6 tồn tại vì hợp đồng đó
không có ai viết ra.

## 1. Vấn đề: hai trục, một media query

CSS có media query theo chiều rộng (`sm:` · `lg:`) và theo chiều cao
(`@media (min-height:)`). Nhưng bố cục hero cần **cả hai cùng lúc**:

> Nếu cửa sổ đủ rộng **và** hero đủ cao, đặt mascot cạnh wordmark.
> Ngược lại, xếp dọc.

Điều kiện "và" giữa hai trục không viết được bằng hai media query rời, vì
chúng không biết nhau. Cách duy nhất là một ngôn ngữ khác — CSS không diễn đạt
được `A ∧ B` khi `A` đến từ viewport width và `B` đến từ một biến do JavaScript
tính.

## 2. Hợp đồng

```
planMenuLayout(viewport)  ──►  MenuPlan { scene, reserve, minimal, … }
                                        │
                                        ▼
                              heroLayout({ scene, width, minimal })
                                        │
                                        ▼
                              HeroLayout { sideBySide, halo, … }
```

Ba bất biến:

1. **`scene + reserve === viewport.height`** — luôn đúng, ở mọi kích thước.
   Đây là bất biến của `layout/fit.ts`, không phải của tài liệu này.
2. **`heroLayout` không đọc DOM.** Nó là hàm thuần của ba số. Đó là lý do
   `tests/menu-adaptive.test.ts` quét được 1 682 kích thước trong 15ms.
3. **`heroContentHeight(heroLayout(x)) ≤ x.scene`** với mọi `x` mà plan sinh
   ra được. Bất biến này do bài quét giữ, không do người viết mã.

## 3. Bốn ngưỡng

| Hằng số | Giá trị | Suy từ | Nếu đặt sai |
| --- | --- | --- | --- |
| `HEIGHT_FOR_BADGE_ROW` | 232 | 150 + 40 + 22 + 20 | dòng kỷ lục bị cắt ở đáy band |
| `HEIGHT_FOR_HALO` | 300 | 150 + 240 − 90 | vòng sáng đè lên badge row |
| `HEIGHT_FOR_SIDE_BY_SIDE` | 300 | 192 + 24 + đệm | mascot bị cắt đáy |
| `WIDTH_FOR_SIDE_BY_SIDE` | 1024 | `lg` của Tailwind | hai cột chen vào 700px |

Cột "Nếu đặt sai" là lý do mỗi ngưỡng có một bài kiểm riêng trong
`describe("the thresholds are derived, not chosen")`.

## 4. Vì sao không có cascade

Mỗi cờ trong `HeroLayout` là một phép thử **độc lập**:

```ts
return {
  sideBySide,                                  // width ≥ 1024 ∧ scene ≥ 300
  halo:      scene >= HEIGHT_FOR_HALO,         // không phụ thuộc sideBySide
  badgeRow:  scene >= HEIGHT_FOR_BADGE_ROW,
  mascot:    true,                             // không bao giờ ẩn logo
  liveBadge: scene >= HEIGHT_FOR_BADGE_ROW,
};
```

Nếu viết theo kiểu cascade (`if (!sideBySide) return { halo: false, … }`) thì
nâng một ngưỡng có thể vô tình tắt một thứ khác. Bài kiểm "the ladder" đi từ
900px xuống 100px theo bước 10px và khẳng định thứ tự tắt: badge row → halo,
và mascot không bao giờ tắt ngoài `minimal`.

## 5. Điều gì xảy ra khi resize

`layout/viewportEvents.ts` đăng ký sáu sự kiện trên một danh sách duy nhất:

```ts
VIEWPORT_EVENTS = [
  "resize", "orientationchange", "fullscreenchange",
  "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange",
]
```

Cả `useMenuPlan()` và `useViewportWidth()` dùng `onViewportChange()`. Cập nhật
được gộp vào một `requestAnimationFrame`, nên kéo cửa sổ không re-plan hàng
trăm lần mỗi giây.

`fullscreenchange` là sự kiện vòng 6 thêm vào — chính là cách người dùng tạo ra
hai ảnh chụp mở đầu vòng này.

## 6. Khi thêm một phần tử vào hero

1. Đo chiều cao thật của nó ở cỡ chữ nhỏ nhất.
2. Thêm một cờ vào `HeroLayout` **và** một ngưỡng vào `breakpoints.ts`.
3. Cộng chiều cao đó vào `heroContentHeight()`.
4. Thêm nó vào bài kiểm "the ladder" nếu nó phải tắt theo thứ tự.
5. Chạy `npx vitest run tests/menu-adaptive.test.ts` — bài quét sẽ nói ngay
   ngưỡng có đúng không.

Bước 3 là bước dễ quên nhất, và là bước duy nhất khiến ngưỡng trở thành số
suy ra thay vì số đoán.
