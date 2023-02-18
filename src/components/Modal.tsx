import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface ModalProps {
  id: string
  children: JSX.Element
  className?: string
  onClick?: () => void
  onClose?: () => void
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { id, children, onClose } = props
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal modal-bottom sm:modal-middle cursor-pointer" onClick={onClose}>
        <label className="modal-box relative h-3/6 bg-base-100" htmlFor="" onClick={onClose}>
          {children}
        </label>
      </label>
    </>
  )
}

export const ModalTrigger: React.FC<ModalProps> = (props) => {
  const { id, children, className, onClick } = props
  return (
    <label htmlFor={id} className={twMerge("flex items-center gap-3", className)} onClick={onClick}>
      {children}
    </label>
  )
}
