import { i18n } from '@lingui/core'
import numeral from 'numeral'

import { convertFromUnits } from './bignumbers'

export const amountFormatter = (x) =>
  i18n.number(x, {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: x < 1 ? 6 : 2
  })

export const percentFormatter = (x, decimals = 2) =>
  i18n.number(x, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })

export const formatWeiToNumber = (x, locale = 'en') => {
  const strEth = convertFromUnits(x)
  const format = strEth < 10000 ? '0.00' : '0.00a'
  numeral.locale(locale)
  return numeral(strEth).format(format).toUpperCase()
}
