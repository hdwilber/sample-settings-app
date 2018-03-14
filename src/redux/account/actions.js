import { createAction } from '../utils'

export const LOGIN = createAction('LOGIN')
export const LOGIN_RESTORE = createAction('LOGIN_RESTORE')
export const LOGOUT = createAction('LOGOUT')
export const SAVE_SETTINGS = createAction('SAVE_SETTINGS')
export const SETTINGS_RESTORE = createAction('SETTINGS_RESTORE')
export const CLEAR_SETTINGS = createAction('CLEAR_SETTINGS')

const defaultEmail = 'wil@tx.com'
const defaultPass = 'asdf'

export function clearSettings() {

  localStorage.removeItem('settings')

  return {
    type: CLEAR_SETTINGS.INIT
  }
}

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
  localStorage.removeItem('session')
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
      dispatch(settingsRestore())
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

export function settingsRestore() {
  return (dispatch, getState) => {
    setTimeout( () => {
      const settings = localStorage.getItem('settings')
      if (settings) {
        dispatch({
          type: SETTINGS_RESTORE.SUCCESS,
          payload: JSON.parse(settings)
        })
      } else {
        dispatch({
          type: SETTINGS_RESTORE.FAILED,
          payload: 'Settings saved not exists'
        })
      }
    }, 100)
    return dispatch({
      type: SETTINGS_RESTORE.INIT,
    })
  }
}

export function saveSettings(data, options) {
  return (dispatch, getState) => {
    setTimeout( () => {
      localStorage.setItem('settings', JSON.stringify(data))
      dispatch({
        type: SAVE_SETTINGS.SUCCESS,
        payload: data,
      })
    }, 100)
  }
}
