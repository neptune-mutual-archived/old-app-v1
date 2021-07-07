import { AddressZero } from '@ethersproject/constants'

export const isLatest = (current, next) => {
  try {
    // Invalid or empty current state
    if (!current || !current.requestedAt) {
      return true
    }

    // Upcoming state is stale
    if (current.requestedAt > next.requestedAt) {
      return false
    }

    // Trying to override with zero address summary
    if (
      current.requestedAt === next.requestedAt &&
      next.account === AddressZero
    ) {
      return false
    }

    return true
  } catch (error) {
    console.log(error.message)
  }
  return false
}
