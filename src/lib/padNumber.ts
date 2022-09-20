export default function padNumber(pad: number, num: number) {
  return (num + '').padStart(pad, '0')
}
