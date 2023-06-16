export interface FERound {
  id: number
  courseId: number
  courseName: string
  golferId: string
  putts: number[]
  gir: boolean[]
  fir: boolean[]
  gross: number[]
  createdAt: string
  parPerHole: number[]
  par: number
}

export type Action =
  | { type: 'ERROR'; payload: string }
  | { type: 'SET_ROUNDS'; payload: FERound[] }