// TODO import course actions
import * as courseAction from '../actions/courses'
import { Action, CoursesAction, FECourse } from '../../models/types'

const initialState = [] as FECourse[]

export default function coursesReducer(
  state = initialState,
  action: CoursesAction
) {
  const { type, payload } = action

  switch (type) {
    case courseAction.SET_COURSES:
      payload.sort((a, b) => a.name.localeCompare(b.name))
      return [...payload]
    default:
      return state
  }
}
