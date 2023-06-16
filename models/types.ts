export interface FERound {
  id: number
  courseId: number
  courseName: string
  golferId: string
  golferName: string
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
  | { type: 'SET_SINGLE_ROUND'; payload: FERound }
