# Assets Module

Module quản lý tất cả static assets (icons, images) trong ứng dụng.

## 📁 Cấu trúc

```
assets/
├── index.ts           # Barrel export
├── icons.ts           # Icon paths và utilities
├── Icon.tsx           # React Icon component
└── README.md          # Documentation
```

## 🎨 Icons

### Cách 1: Sử dụng Icon Component (Recommended)

```tsx
import { Icon } from '@assets'

// Basic usage
<Icon name="money" size={24} />

// With custom className
<Icon name="warnRed" size={32} className="animate-pulse" />

// With all img props
<Icon 
  name="warnYellow" 
  size={48} 
  className="opacity-50"
  alt="Warning icon"
  loading="lazy"
/>
```

### Cách 2: Sử dụng Named Icon Components

```tsx
import { MoneyIconComponent, RedWarnIconComponent } from '@assets'

<MoneyIconComponent size={24} />
<RedWarnIconComponent size={32} className="animate-bounce" />
```

### Cách 3: Sử dụng Icon Paths trực tiếp

```tsx
import { ICONS, MoneyIcon, RedWarnIcon } from '@assets'

// With object
<img src={ICONS.money} alt="Money" width={24} />

// With named export
<img src={MoneyIcon} alt="Money" width={24} />

// In CSS or background
<div style={{ backgroundImage: `url(${ICONS.warnRed})` }} />
```

### Cách 4: Dynamic Icon Loading

```tsx
import { getIconPath, type IconKey } from '@assets'

const iconName: IconKey = 'money'
const iconPath = getIconPath(iconName)

<img src={iconPath} alt="Dynamic icon" />
```

## 📝 Available Icons

| Key | Component | Path Export | Mô tả |
|-----|-----------|-------------|-------|
| `money` | `MoneyIconComponent` | `MoneyIcon` | Icon tiền tệ |
| `warnRed` | `RedWarnIconComponent` | `RedWarnIcon` | Icon cảnh báo đỏ |
| `warnYellow` | `YellowWarnIconComponent` | `YellowWarnIcon` | Icon cảnh báo vàng |

## 🔧 Utilities

### `getIconPath(key: IconKey): string`

Lấy path của icon theo key:

```tsx
import { getIconPath } from '@assets'

const path = getIconPath('money') // '/icons/money-icon.svg'
```

### `isValidIconKey(key: string): key is IconKey`

Kiểm tra xem key có hợp lệ không:

```tsx
import { isValidIconKey } from '@assets'

if (isValidIconKey('money')) {
  // TypeScript biết 'money' là IconKey
  const path = getIconPath('money')
}
```

## 📦 Type Safety

Module này hoàn toàn type-safe:

```tsx
import { Icon, type IconKey } from '@assets'

// ✅ Valid
<Icon name="money" />

// ❌ TypeScript error
<Icon name="invalid" />

// Type for dynamic keys
const keys: IconKey[] = ['money', 'warnRed', 'warnYellow']
```

## ➕ Thêm Icon Mới

1. Thêm file `.svg` vào `public/icons/`
2. Update `icons.ts`:

```ts
export const ICONS = {
  money: `${ICONS_BASE_PATH}/money-icon.svg`,
  warnRed: `${ICONS_BASE_PATH}/red-warn-icon.svg`,
  warnYellow: `${ICONS_BASE_PATH}/yellow-warn-icon.svg`,
  newIcon: `${ICONS_BASE_PATH}/new-icon.svg`, // ← Add here
} as const
```

3. (Optional) Tạo named component trong `Icon.tsx`:

```tsx
export const NewIconComponent = (props: Omit<IconProps, 'name'>) => (
  <Icon name="newIcon" {...props} />
)
```

4. Export trong `index.ts`

## 🎯 Best Practices

### ✅ DO

- Sử dụng `Icon` component cho consistency
- Sử dụng type `IconKey` cho dynamic icons
- Đặt alt text có ý nghĩa
- Sử dụng `size` prop thay vì width/height riêng lẻ

### ❌ DON'T

- Hardcode paths: `<img src="/icons/money-icon.svg" />`
- Skip alt text cho accessibility
- Dùng inline styles thay vì className
- Duplicate icon files

## 🔄 Migration từ hardcoded paths

**Before:**
```tsx
<img src="/icons/money-icon.svg" alt="Money" width={24} height={24} />
```

**After:**
```tsx
import { Icon } from '@assets'

<Icon name="money" size={24} alt="Money" />
```

## 📚 Examples

### Trong expense card header

```tsx
import { Icon } from '@assets'

// Hiển thị warning icon dynamic
const WarnIcon = isDanger 
  ? <Icon name="warnRed" size={24} className="animate-pulse" />
  : <Icon name="warnYellow" size={24} />
```

### Trong stats section

```tsx
import { MoneyIconComponent } from '@assets'

<div className="flex items-center gap-2">
  <MoneyIconComponent size={32} className="text-green-600" />
  <span>Total Balance</span>
</div>
```

