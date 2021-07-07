export const skipLimit = (arr, skip = 0, limit = Infinity) => {
  const afterSkip = arr.filter((x, i) => i > skip - 1)

  const afterLimit = afterSkip.filter((x, i) => i <= limit - 1)

  return afterLimit
}

export const mergeAlternatively = (arr1, arr2, filler) => {
  const maxLength = arr1.length > arr2.length ? arr1.length : arr2.length

  const merged = []
  for (let i = 0; i < maxLength; i++) {
    const leftEl = arr1[i] || filler
    const rightEl = arr2[i] || filler

    merged.push(leftEl, rightEl)
  }

  return merged
}
