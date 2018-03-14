import * as Actions from './actions'

const initialState = {
  loading: false,
  loggedIn: false,
  email: null,
  error: null,
  settings: null,
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
    case Actions.SAVE_SETTINGS.INIT: {
      return {
        ...state,
        loading: true,
      }
    }

    case Actions.SAVE_SETTINGS.SUCCESS: {
      return {
        ...state,
        loading: false,
        settings: action.payload,
      }
    }
    case Actions.SAVE_SETTINGS.FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    case Actions.SETTINGS_RESTORE.INIT: {
      return {
        ...state,
        loading: true,
      }
    }

    case Actions.SETTINGS_RESTORE.SUCCESS: {
      return {
        ...state,
        loading: false,
        settings: action.payload,
      }
    }
    case Actions.SETTINGS_RESTORE.FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    case Actions.CLEAR_SETTINGS.INIT: {
      return {
        ...state,
        settings: null,
      }
    }
  }
  return state
}
