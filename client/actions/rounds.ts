import * as api from '../apis/rounds'
import { FERound, Action, RawCurrentData } from '../../models/types'
import { ThunkAction } from '../store'

export const SET_ROUNDS = 'SET_ROUNDS'
export const ERROR = 'ERROR'
export const SET_SINGLE_ROUND = 'SET_SINGLE_ROUND'

export function setRounds(rounds: FERound[]): Action {
  return {
    type: SET_ROUNDS,
    payload: rounds,
  }
}

export function setSingleRound(round: FERound): Action {
  return {
    type: SET_SINGLE_ROUND,
    payload: round,
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

export function getSingleRound(id: number): ThunkAction {
  return async (dispatch) => {
    try {
      const round = await api.fetchSingleRound(id)
      dispatch(setSingleRound(round))
    } catch (err) {
      console.error('Action error', err)
      dispatch(error(String(err)))
    }
  }
}

export function addRound(currentRoundData: RawCurrentData): ThunkAction {
  return async (dispatch) => {
    try {
      const newRound = await api.postRound(currentRoundData) // create api route
      dispatch(setSingleRound(newRound))
    } catch (err) {
      console.error('Action error', err)
      dispatch(error(String(err)))
    }
  }
}
