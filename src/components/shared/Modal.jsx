import React, { useState, Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'

import { classNames } from '../../utils/class-names'

const Modal = ({ open, closeModal, children, noPadding }) => {
  const [isPending, setIsPending] = useState(false)
  const cancelButtonRef = useRef()

  return (
    <>
      <Transition show={open} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          initialFocus={cancelButtonRef}
          static
          open={open}
          onClose={() => {
            if (!isPending) {
              closeModal()
            }
          }}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-75 backdrop-filter backdrop-blur-sm' />
            </Transition.Child>
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div
                className={classNames(
                  'inline-block w-full max-w-xl my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-800 text-white shadow-xl rounded-2xl',
                  noPadding ? 'p-0' : 'p-6'
                )}
              >
                {children({ cancelButtonRef, isPending, setIsPending })}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export const ModalTitle = ({
  children,
  className,
  closeModal,
  cancelButtonRef,
  isPending = false
}) => {
  return (
    <div className={classNames('flex justify-between items-center', className)}>
      <div>{children}</div>
      <button
        className='flex justify-center items-center text-gray-300 hover:text-white focus:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900'
        onClick={() => {
          if (!isPending) {
            closeModal()
          }
        }}
        ref={cancelButtonRef}
      >
        {!isPending && <XIcon className='w-6 h-6' />}
      </button>
    </div>
  )
}

export default Modal
