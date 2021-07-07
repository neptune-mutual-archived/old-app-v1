export const getErrorMessage = (error) => {
  if (!error || !error.message) {
    return 'Unexpected Error Occured'
  }

  if (error && error.data && error.data.message) {
    return error.data.message.trim().replace('execution reverted: ', '')
  }

  return error.message.trim().replace('MetaMask Tx Signature: ', '')
}
