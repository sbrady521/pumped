import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface ModalProps {
  id: string
  children: JSX.Element
  className?: string
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { id, children } = props
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal modal-bottom sm:modal-middle cursor-pointer">
        <label className="modal-box relative h-3/6 bg-base-100" htmlFor={id}>
          {children}
        </label>
      </label>
    </>
  )
}

export const ModalTrigger: React.FC<ModalProps> = (props) => {
  const { id, children, className } = props
  return (
    <label htmlFor={id} className={twMerge("flex items-center gap-3", className)}>
      {children}
    </label>
  )
}
