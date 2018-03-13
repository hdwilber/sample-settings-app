import { combineReducers } from 'redux'
import appReducer from './app/reducer'
import accountReducer from './account/reducer'

export default combineReducers({
  app: appReducer,
  account: accountReducer,
})
