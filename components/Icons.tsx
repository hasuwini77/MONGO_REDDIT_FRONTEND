// components/Icons.tsx
'use client'
import {
  UserCircle,
  User,
  UserCog,
  UserCircle2,
  Ghost,
  LucideIcon,
} from 'lucide-react'

export const VALID_ICONS = {
  UserCircle,
  User,
  UserCog,
  UserCircle2,
  Ghost,
} as const

export type IconName = keyof typeof VALID_ICONS

export const IconComponent = ({
  name,
  className,
}: {
  name: IconName
  className?: string
}) => {
  // Validate the icon name
  const isValidIcon = name in VALID_ICONS
  if (!isValidIcon) {
    console.warn(`Invalid icon name: ${name}, falling back to UserCircle`)
  }

  // Type assertion to ensure name is a valid key
  const iconName = isValidIcon ? name : 'UserCircle'
  const Icon = VALID_ICONS[iconName]

  return <Icon className={className} />
}

// Add a utility function to validate icon names
export const isValidIconName = (name: string): name is IconName => {
  return name in VALID_ICONS
}
