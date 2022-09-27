export default function padNumber(pad: number, num: number) {
  if (!Number(num)) return ''

  return (num + '').padStart(pad, '0')
}
