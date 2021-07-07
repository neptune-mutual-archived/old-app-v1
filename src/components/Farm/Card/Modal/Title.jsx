import { ModalTitle } from '../../../shared/Modal'

export const CardModalTitle = ({
  children,
  closeModal,
  logo,
  title,
  ...rest
}) => {
  return (
    <ModalTitle closeModal={closeModal} {...rest}>
      <div className='flex items-center gap-3 mb-3'>
        <img src={logo} alt={title} width='36' />
        <h3 className='text-xl md:text-2xl font-medium text-gray-300'>
          {children}
        </h3>
      </div>
    </ModalTitle>
  )
}
