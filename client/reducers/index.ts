import { combineReducers } from 'redux'
import roundsReducer from './rounds'
import roundReducer from './round'
import coursesReducer from './courses'

export default combineReducers({
  rounds: roundsReducer,
  round: roundReducer,
  courses: coursesReducer,
})
