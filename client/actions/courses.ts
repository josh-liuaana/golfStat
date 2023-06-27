import * as api from '../apis/courses'
import { FECourse, CoursesAction, CurrentData } from '../../models/types'
import { ThunkAction } from '../store'

export const SET_COURSES = 'SET_COURSES'
export const SET_CURRENT_COURSE = 'SET_CURRENT_COURSE'
export const SET_SCORE = 'SET_SCORE'
export const ERROR = 'ERROR'

export function setCourses(courses: FECourse[]): CoursesAction {
  return {
    type: SET_COURSES,
    payload: courses,
  }
}

export function setScore(score: CurrentData): CoursesAction {
  return {
    type: SET_SCORE,
    payload: score,
  }
}

export function error(message: string): CoursesAction {
  return {
    type: ERROR,
    payload: message,
  }
}

export function setCurrentCourse(
  course: FECourse,
  holes: CurrentData
): CoursesAction {
  return {
    type: SET_CURRENT_COURSE,
    payload: { course: course, currentData: holes },
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
