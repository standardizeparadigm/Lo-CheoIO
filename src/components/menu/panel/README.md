# `menu/panel` — khoảng dư của một panel không phải là ba khoảng trống

Hai file, một footer.

```
stat.ts            số liệu cho footer — thuần, test được không cần DOM
PanelStatStrip.tsx <PanelStatStrip stats={…} />, chỉ hiển thị
index.ts           barrel
```

## Vấn đề nó sửa

`CornerPanel` là một khung **cao cố định**: 318px ở chế độ gọn, 458px ở chế độ
đầy đủ (xem `layout/metrics.ts`). Panel GAME có 7 hàng nên 7 hàng đó gần lấp
hết khung; panel INFO có 3 hàng nên còn dư một khoảng rất lớn.

Cách cũ xử lý khoảng dư đó là `justify-content: space-around` trên body. Với
GAME (7 hàng) kết quả trông ổn. Với INFO (3 hàng) nó biến khung thành:

```
┌────────────────────┐
│                    │  ← dư
│   GIỚI THIỆU TÁC GIẢ│
│                    │  ← dư
│   CHANGELOG        │
│                    │  ← dư
│   THOÁT            │
│                    │  ← dư
└────────────────────┘
```

Ba nút trông như ba thứ rời rạc, không phải một danh sách. Đó chính là câu
«phần thông tin tự nhiên bị chia ra» trong ảnh chụp thứ hai.

## Cách sửa

Hai thay đổi, và thứ tự quan trọng:

1. **`.corner-panel-body { justify-content: flex-start }`** — hàng xếp thành
   một khối ở đỉnh, giống một danh sách thật. GAME và INFO dùng chung rule,
   không cần biết panel nào có mấy hàng.
2. **Một footer chiếm phần dư** (`margin-top: auto`) — khoảng trống trở thành
   *một* khoảng có chủ đích thay vì N khoảng ngẫu nhiên.

## `stat.ts`

Hai hàm, cả hai đều thuần và đều có test:

```ts
progressStat({ unlocked, total, modes })
// → [ { label: "✓", value: "7/16" }, { label: "◆", value: "9" } ]

buildStat(APP_VERSION, tierFor(latestEntry().version))
// → [ { label: "build", value: "v1.1.8" }, { label: "◆", value: "PATCH" } ]
```

`progressStat` **kẹp** `unlocked` về `[0, total]`. Lý do không phải phòng xa:
một bản lưu cũ từng khiến panel in ra `18/16` vì achievements được đếm theo
khoá lưu mà danh sách thành tựu đã đổi giữa các bản. Footer là nơi con số hiện
ra thường trực nhất, nên nó không được phép in một phân số vô lý.

`buildStat` nhận tier từ **chính** `tierFor(latestEntry().version)` chứ không
phải một tham số rời — nhờ vậy chip `◆PATCH` ở footer không thể lệch với chip
ở panel changelog ngay trên nó.

## Vì sao tách khỏi `CornerPanel`

`CornerPanel` không biết gì về thành tựu hay phiên bản; nó chỉ nhận một
`footer?: ReactNode`. Việc tính toán nằm ở đây, nên `tests/menu-panel.test.ts`
kiểm tra được phép kẹp, phép lấy tier và thứ tự khoá **mà không cần render**
một panel nào — 12 test chạy trong vài mili giây.

## Bất biến được khoá

- Footer **không** được tính theo số hàng: GAME 7 hàng và INFO 3 hàng dùng
  cùng một footer, cùng một rule.
- `justify-around` / `justify-between` / `justify-evenly` **không** được quay
  lại `.corner-panel-body` — có test grep.
- `unlocked` luôn bị kẹp; `NaN` và số âm đều trả `0`.
