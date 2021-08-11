import Option from './Option'

const SelectNetwork = ({ networks, selected, setSelected }) => {
  return (
    <>
      <h4 className='mt-4 text-gray-400 font-semibold'>Select Network</h4>
      <div className='mt-4 grid grid-cols-3 xl:grid-cols-4 gap-2'>
        {networks.map((network) => {
          const { id, displayName, disabled, disabledIcon, enabledIcon } =
            network

          const isDisabled = disabled
          const isActive = id === selected
          const icon = disabled ? disabledIcon : enabledIcon

          const onClick = () => {
            if (isDisabled) {
              return
            }
            setSelected(id)
          }

          const props = {
            onClick,
            name: displayName,
            icon,
            isActive,
            isDisabled
          }

          return <Option key={id} {...props} />
        })}
      </div>
    </>
  )
}

export default SelectNetwork
