interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    className?: string
    label?: string
}

const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-[3px]',
}

export const Spinner = ({ size = 'md', className = '', label = 'Loading' }: SpinnerProps) => {
    return (
        <span role="status" aria-live="polite" className={`inline-flex ${className}`}>
            <span
                className={`${sizes[size]} rounded-full border-coral border-t-transparent animate-spin`}
            />
            <span className="sr-only">{label}</span>
        </span>
    )
}

export default Spinner