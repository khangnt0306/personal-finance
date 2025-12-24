import { ICONS, type IconKey } from './icons'

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Icon key từ ICONS object */
  name: IconKey
  /** Size của icon (width và height sẽ bằng nhau) */
  size?: number | string
  /** Custom className */
  className?: string
}

/**
 * Icon component để render icons từ public/icons
 * 
 * @example
 * ```tsx
 * <Icon name="money" size={24} />
 * <Icon name="warnRed" size={32} className="animate-pulse" />
 * ```
 */
export const Icon = ({ name, size = 24, className = '', alt, ...props }: IconProps) => {
  const iconPath = ICONS[name]
  
  return (
    <img
      src={iconPath}
      alt={alt || name}
      width={size}
      height={size}
      className={className}
      {...props}
    />
  )
}
