import * as api from '../apis/rounds'
import { FERound, Action } from '../../models/types'
import { ThunkAction } from '../store'

export const SET_ROUNDS = 'SET_ROUNDS'
export const ERROR = 'ERROR'

export function setRounds(rounds: FERound[]): Action {
  return {
    type: SET_ROUNDS,
    payload: rounds,
  }
}

export function error(message: string): Action {
  return {
    type: ERROR,
    payload: message,
  }
}

export function getRounds(): ThunkAction {
  return async (dispatch) => {
    try {
      const roundsArr = await api.fetchRounds()
      dispatch(setRounds(roundsArr))
    } catch (err) {
      console.error('Action error', err)
      dispatch(error(String(err)))
    }
  }
}
