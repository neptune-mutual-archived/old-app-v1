export const Bar = ({ distros }) => {
  return (
    <div className='flex gap-1 rounded-full overflow-hidden my-6'>
      {distros.map((distro) => {
        if (distro.name === 'Total Burned') {
          return null
        }
        return (
          <div
            key={distro.name}
            className={`flex-grow h-2 ${distro.color}`}
            style={{
              width: `${distro.fillPercent}%`,
              minWidth: '0.25rem'
            }}
          >
            &nbsp;
          </div>
        )
      })}
    </div>
  )
}
