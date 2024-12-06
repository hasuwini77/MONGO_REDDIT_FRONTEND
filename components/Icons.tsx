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
  UserCircle: UserCircle,
  User: User,
  UserCog: UserCog,
  UserCircle2: UserCircle2,
  Ghost: Ghost,
} as const

export type IconName = keyof typeof VALID_ICONS

export const IconComponent = ({
  name,
  className,
}: {
  name: IconName
  className?: string
}) => {
  const Icon = VALID_ICONS[name]
  return <Icon className={className} />
}
