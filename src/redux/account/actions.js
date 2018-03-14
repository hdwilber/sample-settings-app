import { createAction } from '../utils'

export const LOGIN = createAction('LOGIN')
export const LOGIN_RESTORE = createAction('LOGIN_RESTORE')
export const LOGOUT = createAction('LOGOUT')
export const SAVE_SETTINGS = createAction('SAVE_SETTINGS')
export const CLEAR_SETTINGS = createAction('CLEAR_SETTINGS')

const defaultEmail = 'wil@tx.com'
const defaultPass = 'asdf'

export function login(data, options = {}) {
  return (dispatch, getState) => {
    setTimeout( () => {
      if (data.email === defaultEmail && defaultPass === data.password) {

        if (options.save)
          localStorage.setItem('session', JSON.stringify(data))

        return dispatch({
          type: LOGIN.SUCCESS,
          payload: data,
        })
      } else {
        return dispatch({
          type: LOGIN.FAILED,
          payload: {
            FORM: 'Not valid credentials',
          }
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

export function restore() {
  return (dispatch, getState) => {

    getSession().then (data => {
      const stored = JSON.parse(data)
      dispatch({ 
        type: LOGIN_RESTORE.SUCCESS,
        payload: stored,
      })
    })
    .catch(data => {
      dispatch({ 
        type: LOGIN_RESTORE.FAILED,
        payload: data,
      })
    })

    return dispatch({
      type: LOGIN_RESTORE.INIT,
    })
  }
}

function getSession() {
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      const data = localStorage.getItem('session')
      if (data) {
        resolve(data) 
      } else {
        reject('No session stored')
      }
    }, 10)
  })
}
