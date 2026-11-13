# `src/components/menu/` — Corner panels GAME & INFO

Module menu chính của v1.1.5. Hai panel góc + toàn bộ modal đi kèm.

```
CornerPanel.tsx      khung panel góc (trái/phải): nhãn uppercase + góc tick nghệ
MenuItemButton.tsx   hàng nút compact (icon · label · hint · trailing) — 5 variant
GameMenu.tsx         GAME (góc dưới-trái): Chơi · Chơi tiếp(gated) · Chế độ · BXH · Thành tựu · Cài đặt
InfoMenu.tsx         INFO (góc dưới-phải): Giới thiệu · Changelog · Thoát
ModeSelectModal.tsx  9 chế độ trong modal rộng (reuse ModeSelector)
SettingsModal.tsx    4 Switch (sfx/music/shake/reducedMotion) + danger zone 2 bước
LeaderboardModal.tsx TOP 8 local (reuse gradient-border + ScoreBoard)
AchievementsModal.tsx  tường 16 huy hiệu (reuse AchievementsPanel)
AboutModal.tsx       about card tác giả (role · craft · contact · license · fonts)
ChangelogModal.tsx   timeline changelog từ src/game/changelog.ts
QuitModal.tsx        window.close() best-effort + hint Ctrl/Cmd+W
icons/               9 icon stroke-consistent, mỗi icon một file
icons/index.ts       barrel
index.ts             barrel exports (import từ "./menu")
```

Quy ước:

- Modal mới → dùng `Modal` từ `../ui` (Escape + backdrop + capture-swallow tích hợp sẵn).
- Nút trong panel → `MenuItemButton`; icon → `./icons`.
- Text → chỉ qua `t()` với key trong `src/i18n/locales/*` (thêm key mới vào cả 7 locale).
- GAME panel = hành động chơi; INFO panel = thông tin dự án — đừng trộn.
