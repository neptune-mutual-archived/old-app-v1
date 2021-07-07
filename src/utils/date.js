import format from 'date-fns-tz/format'
import utcToZonedTime from 'date-fns-tz/utcToZonedTime'
import compareAsc from 'date-fns/compareAsc'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import fromUnixTimeUtil from 'date-fns/fromUnixTime'
import getUnixTime from 'date-fns/getUnixTime'
import parseISO from 'date-fns/parseISO'

// time => '2019-10-25T08:10:00Z'
export const formatToUTC = (time, simpler = false) => {
  const parsedTime = parseISO(time) // => 2019-10-25T08:10:00.000Z

  return format(
    utcToZonedTime(parsedTime, 'UTC'),
    simpler ? 'dd LLL yyyy, hh:mm b' : 'yyyy-MM-dd kk:mm',
    { timeZone: 'UTC' }
  ) // => 2019-10-25 08:10
}

export const unixTimeAfter = (seconds = 0) => {
  return getUnixTime(new Date()) + seconds
}

export const fromUnixTime = (t) => fromUnixTimeUtil(t || unixTimeAfter())

export const isPast = (d) => compareAsc(new Date(), d) > -1

export const formatRelative = (d) => formatDistanceToNow(d, { addSuffix: true })
