import { combineReducers } from 'redux'
import roundsReducer from './rounds'
import roundReducer from './round'

export default combineReducers({
  rounds: roundsReducer,
  round: roundReducer,
})
