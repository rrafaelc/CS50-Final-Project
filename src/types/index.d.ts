export interface StatusProps {
  id: string
  tvApiId: number
  title: string
  genre: string
  // status: 'watching' | 'completed' | 'onhold' | 'dropped' | 'ptw'
  status: string
  season: number
  episode: number
  poster: string
  type: string
  // update: {
  //   year: number
  //   month: number
  //   day: number
  // }
  updatedAt: string
}
