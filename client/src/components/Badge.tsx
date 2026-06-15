type BadgeVariant = 'default' | 'coral' | 'success' | 'warning' | 'danger' | 'info'
type BadgeSize = 'sm' | 'md'

interface BadgeProps {
    children?: React.ReactNode
    variant?: BadgeVariant
    size?: BadgeSize
    iconLeft?: React.ReactNode
    className?: string
}

const variants: Record<BadgeVariant, string> = {
    default: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300',
    coral:   'bg-coral-light text-coral-dark dark:bg-coral/20 dark:text-coral',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    danger:  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    info:    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
}

const sizes: Record<BadgeSize, string> = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
}

export const Badge = ({
    children,
    variant = 'default',
    size = 'md',
    iconLeft,
    className = ''
}: BadgeProps) => {
    return (
        <span
            className={[
                'inline-flex items-center font-medium rounded-full whitespace-nowrap',
                variants[variant],
                sizes[size],
                className,
            ]
                .filter(Boolean)
                .join(' ')}
        >
      {iconLeft && <span className="shrink-0">{iconLeft}</span>}
            {children}
    </span>
    )
}

export default Badge