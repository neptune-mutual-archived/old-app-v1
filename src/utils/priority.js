export const getPriorityAPY = (apy) => {
  if (!apy) {
    return 2
  }
  const percent = parseFloat(apy)

  if (percent > 200) {
    return 0
  }
  if (percent > 100) {
    return 1
  }

  return 2
}
