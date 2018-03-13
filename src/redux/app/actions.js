import { createAction } from '../utils'
import { restore } from '../account/actions'

export const START = createAction('APP_START')

export function startApp() {
  return (dispatch, getState) => {
    const startTime = Date.now()
    setTimeout( () => {

      dispatch(restore())

      return dispatch({
        type: START.SUCCESS,
        payload: (Date.now() -  startTime),
      })
    }, 200)

    return dispatch({
      type: START.INIT
    })
  }
}
