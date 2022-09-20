export default function parseDate(date: string) {
  const parseDate = date.split('T')[0]

  const dateSplit = parseDate.split('-')

  const year = Number(dateSplit[0])
  const month = Number(dateSplit[1])
  const day = Number(dateSplit[2])

  return {
    year,
    month,
    day,
  }
}
