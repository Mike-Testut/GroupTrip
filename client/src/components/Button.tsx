import {ButtonHTMLAttributes, forwardRef,} from "react";


type Variant = "primary" | "ghost" | "danger" | "subtle";
type Size = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    loading?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    fullWidth?: boolean;
}

const base = [
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-lg border transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500',
    'disabled:opacity-40 disabled:pointer-events-none',
    'active:scale-[0.98]',
].join(' ')

const variants: Record<Variant, string> = {
    primary: 'bg-[#D85A30] hover:bg-[#993C1D] text-white border-transparent',
    ghost:   'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700',
    danger:  'bg-red-600 hover:bg-red-700 text-white border-transparent',
    subtle:  'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border-transparent',
}

const sizes: Record<Size, string> = {
    sm: 'text-sm px-3 py-1.5 h-8',
    md: 'text-sm px-4 py-2 h-9',
    lg: 'text-base px-6 py-2.5 h-11',
}

const Spinner = ()=> (
    <svg
        className="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
        >
        <circle className='opacity-25' cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
)

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant="primary",
            size = "md",
            loading = false,
            iconLeft,
            iconRight,
            fullWidth = false,
            className = '',
            children,
            disabled,
            ...props
        },
        ref
    )=>{
        return (
            <button
                ref = {ref}
                disabled = {disabled || loading}
                className = {[
                    base,
                    variants[variant],
                    sizes[size],
                    fullWidth ? 'w-full' : '',
                    className,
                        ]
        .filter(Boolean)
                .join(' ')}
            {...props}
            >
                {loading ? (
                    <Spinner />
                ) : iconLeft ? (
                    <span className="shrink-0">{iconLeft}</span>
                ) : null}
                {children && <span>{children}</span>}
                {!loading && iconRight && (
                    <span className="shrink-0">{iconRight}</span>
                )}
            </button>

        )
    }
)

Button.displayName = 'Button'
export default Button