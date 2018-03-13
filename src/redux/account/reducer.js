import * as Actions from './actions'

const initialState = {
  loading: false,
  email: null,
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case Actions.LOGIN.SUCCESS: {
      return {
        ...state,
        loading: true,
      }
    }
  }
  return state
}
