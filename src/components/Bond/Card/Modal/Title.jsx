import { ModalTitle } from '../../../shared/Modal'

export const CardModalTitle = ({
  children,
  closeModal,
  isPending,
  logo,
  name
}) => {
  return (
    <ModalTitle closeModal={closeModal} isPending={isPending}>
      <div className='flex items-center gap-3 mb-3'>
        <img src={logo} alt={name} width='36' />
        <h3 className='text-xl md:text-2xl font-medium text-gray-300'>
          {children}
        </h3>
      </div>
    </ModalTitle>
  )
}

export default CardModalTitle
