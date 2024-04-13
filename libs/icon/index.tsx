import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  GripVertical,
  MoonIcon,
  Plus,
  RotateCcw,
  Search,
  SunIcon,
  Trash2,
  X,
} from 'lucide-react'
import React from 'react'

import Github from './assets/github'
import Spinner from './assets/spinner'

const iconComponents = {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoonIcon,
  SunIcon,
  Circle,
  Github,
  Spinner,
  X,
  Search,
  RotateCcw,
  Trash2,
  GripVertical,
  Plus,
}

export const Icon = (props) => {
  const IconComponent = iconComponents[props.name]

  if (IconComponent) {
    return <IconComponent {...props} />
  }
  return null
}
