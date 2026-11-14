# `menu/deck` — ba ô, ba thứ menu không nói ở chỗ khác

```
daily.ts       thử thách hôm nay, suy ra từ ngày (thuần, test được)
tip.ts         luật chơi xoay vòng (thuần)
width.ts       hai ngưỡng bề rộng có tên
MenuDeck.tsx   ba ô, chỉ hiển thị
index.ts       barrel
```

## Vì sao nó thay `menu/stage`

Vòng 2 lấp khoảng trống dưới tagline bằng ba con số — `9 chế độ · 14 nguyên
liệu · 16 thành tựu`. Yêu cầu vòng 3 bảo bỏ, và đúng: **đoạn tagline ngay phía
trên đã nói đúng ba con số đó.** Dải kia chỉ lặp lại chúng, to hơn.

Hình dạng ba ô thì không có gì sai — ba ô, đường kẻ mảnh giữa, số ở trên nhãn ở
dưới. Nên hình dạng được giữ; nội dung đổi thành ba thứ menu **không** nói ở chỗ
khác:

| Ô | Nội dung | Nguồn |
| --- | --- | --- |
| trái | chế độ đang chọn + mô tả | `mode.<id>.name` · `mode.<id>.desc` |
| giữa | thử thách hôm nay: một chế độ + một mốc điểm | `challengeFor()` |
| phải | luật chơi trong ngày → mở modal Cách chơi | `rule.<n>.t` · `rule.<n>.d` |

## Ba cái bẫy, và vì sao mỗi cái đều được test

### 1. Ngày phải là ngày **địa phương**

```ts
export function localDayNumber(date: Date): number {
  const local = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.round(local.getTime() / 86_400_000);
}
```

Nếu dùng mốc UTC, thử thách đổi lúc **07:00 sáng ở Việt Nam** — giữa một buổi
chơi. Người chơi không đọc đó là "ngày mới"; họ đọc là *"nó đổi hai lần hôm
nay"*, và đó là một báo lỗi chắc chắn.

`Math.round`, không `Math.floor`: một ca DST làm nửa đêm địa phương lệch một
giờ so với mốc epoch, và `floor` sẽ **rơi mất một ngày**.

### 2. Không được dùng phép chia lấy dư theo số chế độ

```ts
const mode = modeIds[day % modeIds.length];   // ✗
```

Số ngày tăng 1 mỗi ngày, nên chỉ số cũng tăng 1 mỗi ngày: hôm nay classic, mai
zen, mốt inferno… Người chơi học được quy luật sau ba ngày và thử thách mất
hết ý nghĩa.

`mix()` là một bộ trộn 32-bit nhỏ (nhân `Math.imul` ba lần rồi xor dịch phải).
Không phải mật mã — không ai bảo vệ giải thưởng ở đây — chỉ cần đầu ra không
đồng biến với đầu vào.

### 3. Tip **không** được xoay cùng hash với thử thách

Nếu cả hai cùng nhịp, mỗi chế độ luôn đi với đúng một luật, và người chơi chỉ
học được một phần sáu trò chơi. Tip dùng bước nhảy **5 trên 6 ô** — nguyên tố
cùng nhau, nên cả sáu luật xuất hiện trước khi có lần lặp đầu tiên.

## Vì sao nội dung là **dữ liệu**, không phải hằng số

`challengeFor(date, modeIds)` nhận danh sách chế độ từ ngoài. Thêm chế độ thứ
mười thì vòng xoay tự rộng ra và **không test nào phải sửa**. Đó cũng là lý do
`MenuDeck` nhận `now?: Date` — test ghim một ngày thay vì chờ đồng hồ chạy.

## Bất biến được khoá (`tests/menu-deck.test.ts`, 22 test)

- `localDayNumber` ổn định suốt 24 giờ, tăng đúng 1 mỗi ngày, sống qua DST.
- `mix()` trả số nguyên không dấu 32-bit, và **không** trả giá trị liên tiếp cho
  đầu vào liên tiếp.
- `challengeFor` tất định trong một ngày; chạm **cả chín** chế độ trong 90 ngày;
  mốc điểm trong `[1200, 3600]` và chia hết cho 100.
- `tipIndexFor` chạm cả sáu luật trong một chu kỳ sáu ngày, và trả `0` cho
  `NaN`/`Infinity` thay vì `NaN`.
- `RULE_COUNT === 6` khớp với số `rule.N.t` thật trong file locale.
- `DECK_MIN_WIDTH > DECK_HIDE_WIDTH`, và `DECK_HIDE_WIDTH === 640` (Tailwind
  `sm`).

## Ngưỡng bề rộng

| Hằng | Giá trị | Nghĩa |
| --- | --- | --- |
| `DECK_HIDE_WIDTH` | 640 | dưới ngưỡng này cả deck ẩn (`.deck` là `hidden sm:grid`) |
| `DECK_MIN_WIDTH` | 840 | dưới ngưỡng này bỏ cột giữa, còn hai ô |

Có tên riêng để test và probe khẳng định **đúng con số** component đang rẽ
nhánh, thay vì một `640` viết thẳng trong JSX mà không ai kiểm.
