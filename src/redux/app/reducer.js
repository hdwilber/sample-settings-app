import * as Actions from './actions'

const initialState = {
  loading: false,
  time: 0
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case Actions.START.INIT: {
      return {
        ...state,
        loading: true,
      }
    }
    case Actions.START.SUCCESS: {
      return {
        ...state,
        loading: false,
        time: action.payload
      }
    }
                                    
    case Actions.START.FAILED: {
      return {
        ...state,
        loading: false,
      }
    }
  }

  return state
}

