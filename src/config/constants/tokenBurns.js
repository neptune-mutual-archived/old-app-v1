import { convertToUnits } from '../../utils/bignumbers'

const tokenBurnsPerNetwork = [
  {
    networkId: 56,
    data: [
      {
        txHash:
          '0xfe4a87d9758235a7d8313080fdcb8be78f4c29c8c97936a76fdba0206b13a25a',
        amount: convertToUnits(2000000)
      }
    ]
  }
]

export const getBurnedData = (networkId) => {
  const network = tokenBurnsPerNetwork.find((x) => x.networkId === networkId)

  return network.data
}
