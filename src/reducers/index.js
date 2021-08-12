import { combineReducers } from 'redux'
import { changeStateReducer } from './ui.reducer'
import { loadingBarReducer } from 'react-redux-loading-bar'
import { alert } from './alert.reducer'
import accountReducer from './account.reducer'
import loginReducer from '../views/pages/login/reducer'
import quarterReducer from '../views/pages/quarter/reducer'
import userReducer from '../views/pages/users/reducer'

const rootReducer = combineReducers({
  changeState: changeStateReducer,
  loadingBar: loadingBarReducer,
  alert,
  account: accountReducer,
  login: loginReducer,
  quarter: quarterReducer,
  users: userReducer,
})

export default rootReducer
