import * as api from '../apis/courses'
import { FECourse, CoursesAction } from '../../models/types'
import { ThunkAction } from '../store'

export const SET_COURSES = 'SET_COURSES'
export const ERROR = 'ERROR'

export function setCourses(courses: FECourse[]): CoursesAction {
  return {
    type: SET_COURSES,
    payload: courses,
  }
}

export function error(message: string): CoursesAction {
  return {
    type: ERROR,
    payload: message,
  }
}

export function getCourses(): ThunkAction {
  return async (dispatch) => {
    try {
      const coursesArr = await api.fetchCourses()
      dispatch(setCourses(coursesArr))
    } catch (err) {
      console.error('Action error', err)
      dispatch(error(String(err)))
    }
  }
}
