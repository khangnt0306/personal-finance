/**
 * Icon paths from public/icons directory
 * Import này giúp quản lý icons dễ dàng và có type-safe
 */

// Base path cho icons
const ICONS_BASE_PATH = '/icons' as const

// Icon paths
export const ICONS = {
  money: `${ICONS_BASE_PATH}/money-icon.svg`,
  warnRed: `${ICONS_BASE_PATH}/red-warn-icon.svg`,
  warnYellow: `${ICONS_BASE_PATH}/yellow-warn-icon.svg`,
  safe: `${ICONS_BASE_PATH}/safe-icon.svg`,
} as const

// Type cho icon keys
export type IconKey = keyof typeof ICONS

// Helper function để get icon path
export const getIconPath = (key: IconKey): string => {
  return ICONS[key]
}

// Helper function để check nếu icon key valid
export const isValidIconKey = (key: string): key is IconKey => {
  return key in ICONS
}

// Export individual icons cho convenience
export const MoneyIcon = ICONS.money
export const RedWarnIcon = ICONS.warnRed
export const YellowWarnIcon = ICONS.warnYellow
export const SafeIcon = ICONS.safe

