export interface StatusProps {
  title: string
  season: number
  episode: number
  status: 'watching' | 'completed' | 'onhold' | 'dropped' | 'ptw'
  update: {
    year: number
    month: number
    day: number
  }
  type: string
  poster: string
}
