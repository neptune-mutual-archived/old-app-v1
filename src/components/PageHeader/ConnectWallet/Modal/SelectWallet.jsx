import Option from './Option'

const SelectWallet = ({ wallets, selected, setSelected }) => {
  return (
    <>
      <h4 className='mt-4 text-gray-400 font-semibold'>Select Wallet</h4>
      <div className='mt-4 grid grid-cols-3 xl:grid-cols-4 gap-2'>
        {wallets.map((wallet) => {
          const { id, name, disabled, disabledIcon, enabledIcon } = wallet

          const isDisabled = disabled
          const isActive = id === selected
          const icon = isDisabled ? disabledIcon : enabledIcon

          const onClick = () => {
            if (isDisabled) {
              return
            }
            setSelected(id)
          }

          const props = { onClick, name, icon, isActive, isDisabled }

          return <Option key={id} {...props} />
        })}
      </div>
    </>
  )
}

export default SelectWallet
