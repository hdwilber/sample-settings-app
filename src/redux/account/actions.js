import { createAction } from '../utils'

export const LOGIN = createAction('LOGIN')
export const LOGOUT = createAction('LOGOUT')
export const SAVE_SETTINGS = createAction('SAVE_SETTINGS')
export const CLEAR_SETTINGS = createAction('CLEAR_SETTINGS')

const defaultEmail = 'wil@tx.com'
const defaultPass = 'asdf'

export function login(data) {
  return (dispatch, getState) => {
    setTimeout( () => {
      if (data.email === defaultEmail && defaultPass === data.password) {
        return dispatch({
          type: LOGIN.SUCCESS,
          payload: data,
        })
      } else {
        return dispatch({
          type: LOGIN.FAILED,
          payload: 'Wrong credentials'
        })
      }
    }, 1000)

    return dispatch({
      type: LOGIN.INIT,
    })
  }
}

export function logout() {
  return {
    type: LOGOUT.SUCCESS,
  }
}

