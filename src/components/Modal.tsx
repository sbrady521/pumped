import React from 'react'

export interface ModalProps {
  id: string
  children: JSX.Element
  isOpen: boolean
  className?: string
  onClose: () => void
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { id, isOpen, children, onClose } = props
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" checked={isOpen} readOnly />
      <label 
        htmlFor={id} 
        className="modal modal-bottom sm:modal-middle cursor-pointer" 
        onClick={onClose}
      >
        <label 
          className="modal-box relative h-fit min-h-3/6 bg-base-100" 
          htmlFor="" 
          onClick={(e) => { 
            e.stopPropagation()
          }}
        >
          {children}
        </label>
      </label>
    </>
  )
}

