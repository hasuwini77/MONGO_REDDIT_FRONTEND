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
  const Icon = VALID_ICONS[name] || VALID_ICONS['UserCircle']
  return <Icon className={className} />
}
