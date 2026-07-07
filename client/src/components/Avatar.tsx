import { useState } from 'react'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'

interface AvatarProps {
    name: string
    src?: string | null
    size?: AvatarSize
    className?: string
}

const sizes: Record<AvatarSize, string> = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
}

const palette = [
    'bg-coral text-white',
    'bg-blue-500 text-white',
    'bg-green-500 text-white',
    'bg-purple-500 text-white',
    'bg-amber-500 text-white',
    'bg-pink-500 text-white',
    'bg-teal-500 text-white',
]

const getInitials = (name: string) =>
    name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('')

const getColor = (name: string) => {
    let hash = 0
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return palette[Math.abs(hash) % palette.length]
}

export const Avatar = ({ name, src, size = 'md', className = '' }: AvatarProps) => {
    const [imgFailed, setImgFailed] = useState(false)
    const showImage = src && !imgFailed

    return (
        <span
            title={name}
            className={[
                'inline-flex items-center justify-center rounded-full font-medium overflow-hidden shrink-0',
                'ring-2 ring-white dark:ring-neutral-900',
                sizes[size],
                showImage ? '' : getColor(name),
                className,
            ]
                .filter(Boolean)
                .join(' ')}
        >
      {showImage ? (
          <img
              src={src}
              alt={name}
              className="h-full w-full object-cover"
              onError={() => setImgFailed(true)}
          />
      ) : (
          getInitials(name)
      )}
    </span>
    )
}

interface AvatarStackProps {
    members: { name: string; src?: string | null }[]
    size?: AvatarSize
    max?: number
}

// Overlapping row of avatars with a "+N" overflow chip.
// Used on trip cards to show who's in a trip at a glance.
export const AvatarStack = ({ members, size = 'sm', max = 4 }: AvatarStackProps) => {
    const visible = members.slice(0, max)
    const overflow = members.length - visible.length

    return (
        <div className="flex items-center -space-x-2">
            {visible.map((m, i) => (
                <Avatar key={i} name={m.name} src={m.src} size={size} />
            ))}
            {overflow > 0 && (
                <span
                    className={[
                        'inline-flex items-center justify-center rounded-full font-medium shrink-0',
                        'ring-2 ring-white dark:ring-neutral-900',
                        'bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300',
                        sizes[size],
                    ].join(' ')}
                >
          +{overflow}
        </span>
            )}
        </div>
    )
}

export default Avatar