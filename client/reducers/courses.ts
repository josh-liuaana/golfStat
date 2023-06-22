import * as courseAction from '../actions/courses'
import { CoursesAction, FECourse } from '../../models/types'

interface CurrentCourse {
  current: FECourse
  all: FECourse[]
}

const initialState = {} as CurrentCourse

export default function coursesReducer(
  state = initialState,
  action: CoursesAction
) {
  const { type, payload } = action

  switch (type) {
    case courseAction.SET_COURSES:
      payload.sort((a, b) => a.name.localeCompare(b.name))
      return { current: { ...state.current }, all: [...payload] }

    case courseAction.SET_CURRENT_COURSE:
      return {
        current: { course: payload.course, currentData: payload.currentData },
        all: [...state.all],
      }

    default:
      return state
  }
}
