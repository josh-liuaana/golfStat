import { combineReducers } from 'redux'
import roundsReducer from './rounds'

export default combineReducers({
  rounds: roundsReducer,
})
