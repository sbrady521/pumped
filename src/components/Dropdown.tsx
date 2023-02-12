import React from 'react'

export interface Option<T> {
  label: string
  value: T
}

export interface DropdownProps<T> {
  options: Option<T>[]
  onSelect: (value: string) => void
}

export function Dropdown<T> (props: DropdownProps<T>): JSX.Element {
  const { options, onSelect } = props
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn m-1">Theme</label>
      <ul tabIndex={0} className="dropdown-content menu bg-base-200 p-2 shadow rounded-box w-52">
        {options.map(opt => (
          <li key={opt.label} onClick={(): void => onSelect(opt.value)}><a>{opt.label}</a></li>
        ))}
      </ul>
    </div>
  )
}