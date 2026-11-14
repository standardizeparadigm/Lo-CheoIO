# `menu/adaptive/` — bố cục hero theo kích thước thật

Module này trả lời **một** câu hỏi: *ở cửa sổ này, hero được phép hiện những gì?*

Trước vòng 6, câu hỏi đó được trả lời bởi hai hệ thống không biết nhau:

| Thứ quyết định | Biết | Không biết |
| --- | --- | --- |
| `sm:` · `lg:` trong CSS | chiều **rộng** | chiều **cao** |
| `plan.minimal` | chiều **cao** (dưới 220px) | chiều rộng, và chỉ bật khi đã quá muộn |

Hệ quả là hai ảnh chụp của cùng một ứng dụng, cùng chiều rộng `1920`, lệch
nhau 260px chiều cao, cho ra **cùng một** bố cục — và một trong hai không có
chỗ chứa nó.

## Hai file

| File | Xuất | Vai trò |
| --- | --- | --- |
| `breakpoints.ts` | 4 hằng số | ngưỡng chiều cao, mỗi cái suy từ chiều cao thật của thứ nó canh |
| `hero.ts` | `heroLayout()` · `heroContentHeight()` · 2 type | hàm thuần: vào `{ scene, width, minimal }`, ra 5 boolean |

`index.ts` là barrel. Component **không** import trực tiếp từ file nào khác.

## `heroLayout()` — năm quyết định, không có cascade

```ts
heroLayout({ scene, width, minimal }) → {
  sideBySide,   // lockup cạnh mascot, thay vì xếp trên
  halo,         // vòng sáng quanh mascot
  badgeRow,     // tấm «HŨ DƯA ĐẠI CHIẾN» + dòng kỷ lục
  mascot,       // chú lọ — luôn true ngoài `minimal`
  liveBadge,    // dòng TRỰC TIẾP TỪ BẾP + phiên bản
}
```

`minimal` thắng tất cả. Dưới nó, **mỗi cờ là một phép thử độc lập** — không cờ
nào phụ thuộc cờ khác. Đó là lý do nâng ngưỡng `badgeRow` không thể vô tình ẩn
mascot.

## Ba ngưỡng, và tại sao không có số tròn

| Hằng số | Giá trị | Suy từ |
| --- | --- | --- |
| `HEIGHT_FOR_BADGE_ROW` | `232` | wordmark 150 + badge 40 + live badge 22 = 212, cộng 20px thở |
| `HEIGHT_FOR_HALO` | `300` | lockup 150 + vòng 240 − chồng lấn 90 |
| `HEIGHT_FOR_SIDE_BY_SIDE` | `300` | cột cao hơn: mascot 192 + chip 24 + đệm |

`232` từng là `210` và đó là **một lỗi**: 210 thấp hơn chính cái lockup 212px
mà nó canh, nên band 210px vẽ lockup 212px và dòng kỷ lục bị cắt. Bài kiểm
`tests/menu-adaptive.test.ts` bắt được, không phải người đọc mã.

`HEIGHT_FOR_HALO` bằng `HEIGHT_FOR_SIDE_BY_SIDE` **có chủ ý**: khi hero xếp dọc,
vòng sáng ở chung cột với lockup, nên nó cần đúng band mà bố cục hai cột cần.

## `heroContentHeight()`

Trả về chiều cao mà một bố cục **thực sự** cần. Đây là thứ làm các ngưỡng kiểm
được: bài quét so nó với `scene` ở **1 682** kích thước cửa sổ.

```ts
// tests/menu-adaptive.test.ts
for (let w = 320; w <= 3840; w += 61) {
  for (let h = 150; h <= 700; h += 19) {
    expect(heroContentHeight(heroLayout({ scene: h, width: w, minimal: false })))
      .toBeLessThanOrEqual(h);
  }
}
```

## Ai dùng

`StartScreen.tsx` — gọi một lần mỗi lần render:

```tsx
const plan = useMenuPlan();
const width = useViewportWidth();
const hero = heroLayout({ scene: plan.scene, width, minimal: plan.minimal });
```

Cả `plan` và `width` đều cập nhật khi cửa sổ đổi — xem
`../layout/viewportEvents.ts`. Vì `plan.scene` là **cùng con số** `MenuChrome`
đang giữ chỗ, bố cục hero và chiều cao chrome không thể lệch nhau.
