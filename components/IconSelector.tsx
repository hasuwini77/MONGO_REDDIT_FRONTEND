import { UserCircle, User, UserCog, UserCircle2, Ghost } from 'lucide-react'
import { VALID_ICONS } from './Icons'

import type { IconName } from './Icons'

interface IconSelectorProps {
  selected: IconName
  onChange: (iconName: IconName) => void
}

export const IconSelector = ({ selected, onChange }: IconSelectorProps) => {
  return (
    <div className='flex items-center gap-4'>
      {Object.entries(VALID_ICONS).map(([name, Icon]) => (
        <button
          key={name}
          type='button'
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onChange(name as IconName)
          }}
          className={`rounded-full p-2 transition-colors hover:bg-gray-100 ${selected === name ? 'bg-purple-100 ring-2 ring-purple-500' : ''}`}
        >
          <Icon
            className={`h-8 w-8 ${
              selected === name ? 'text-purple-500' : 'text-gray-600'
            }`}
          />
        </button>
      ))}
    </div>
  )
}
