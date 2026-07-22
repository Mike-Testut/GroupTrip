import {type InputHTMLAttributes, forwardRef, useId } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    hint?: string
    iconLeft?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, hint, iconLeft, className = '', id, disabled, ...props }, ref) => {
        // Generate a stable unique id so the <label> and <input> are linked
        // for accessibility, even if the caller doesn't pass an id.
        const generatedId = useId()
        const inputId = id || generatedId
        const describedBy = error
            ? `${inputId}-error`
            : hint
                ? `${inputId}-hint`
                : undefined

        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                    >
                        {label}
                    </label>
                )}

                <div className="relative">
                    {iconLeft && (
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              {iconLeft}
            </span>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        disabled={disabled}
                        aria-invalid={!!error}
                        aria-describedby={describedBy}
                        className={[
                            'w-full h-10 rounded-lg border bg-white dark:bg-neutral-900',
                            'text-sm text-neutral-900 dark:text-neutral-100',
                            'placeholder:text-neutral-400',
                            'transition-colors duration-150',
                            'focus:outline-none focus:ring-2 focus:ring-offset-0',
                            iconLeft ? 'pl-9 pr-3' : 'px-3',
                            error
                                ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500'
                                : 'border-neutral-200 dark:border-neutral-700 focus:ring-coral/30 focus:border-coral',
                            'disabled:opacity-50 disabled:cursor-not-allowed',
                            className,
                        ]
                            .filter(Boolean)
                            .join(' ')}
                        {...props}
                    />
                </div>

                {error ? (
                    <p id={`${inputId}-error`} className="text-xs text-red-500">
                        {error}
                    </p>
                ) : hint ? (
                    <p id={`${inputId}-hint`} className="text-xs text-neutral-500">
                        {hint}
                    </p>
                ) : null}
            </div>
        )
    }
)

Input.displayName = 'Input'

export default Input