import React from 'react'
import ReactModal from 'react-modal'

const customStyles = {
  content: {
    margin: 'auto'
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export const Modal: React.FC<ReactModal['props']> = (props) => {
  const { children, ...rest } = props
  return (
    <ReactModal 
      style={customStyles}
      {...rest}  
    >
      <div className='w-full h-full dark:bg-grey-700 bg-grey-100 text-grey-800 dark:text-grey-400'>
        {children}
      </div>
    </ReactModal>
  )
}
