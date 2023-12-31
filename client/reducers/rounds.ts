import * as roundAction from '../actions/rounds'
import { Action, FERound } from '../../models/types'

const initialState = [] as FERound[]

export default function roundsReducer(state = initialState, action: Action) {
  const { type, payload } = action

  switch (type) {
    case roundAction.SET_ROUNDS:
      return payload

    case roundAction.ERROR:
      return payload

    default:
      return state
  }
}
