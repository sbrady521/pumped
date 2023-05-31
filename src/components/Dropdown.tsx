import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select'
import { Button } from './Button'

export interface Option {
  label: string
  value: string 
}

export interface DropdownProps {
  label?: string
  options: Option[]
  onSelect: (value: string) => void
}

export function Dropdown (props: DropdownProps): JSX.Element {
  const { label, options, onSelect } = props
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {options.map(opt => (
          <SelectItem key={opt.label} value={opt.value}>{opt.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
