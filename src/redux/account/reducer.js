import * as Actions from './actions'

const initialState = {
  loading: false,
  loggedIn: false,
  email: null,
  error: null,
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case Actions.LOGIN.INIT: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }

    case Actions.LOGIN.SUCCESS: {
      const { email } = action.payload 
      return {
        ...state,
        loading: false,
        loggedIn: true,
        email,
      }
    }
    case Actions.LOGIN.FAILED: {
      return {
        ...initialState,
        error: action.payload,
      }
    }
    case Actions.LOGIN_RESTORE.INIT: {
      return {
        ...state,
        loading: true,
      }
    }

    case Actions.LOGIN_RESTORE.SUCCESS: {
      const { email } = action.payload 
      return {
        ...state,
        loading: false,
        loggedIn: true,
        email,
      }
    }
    case Actions.LOGIN_RESTORE.FAILED: {
      return {
        ...initialState,
        error: action.payload,
      }
    }
  }
  return state
}
