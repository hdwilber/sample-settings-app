import { createAction } from '../utils'

export const START = createAction('APP_START')

export function startApp() {
  return (dispatch, getState) => {
    const startTime = Date.now()
    setTimeout( () => {
      console.log(startTime)
      console.log(Date.now())
      return dispatch({
        type: START.SUCCESS,
        payload: (Date.now() -  startTime),
      })
    }, 2000)

    return dispatch({
      type: START.INIT
    })
  }
}
