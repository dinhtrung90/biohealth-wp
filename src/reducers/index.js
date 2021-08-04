import { combineReducers } from 'redux'
import { changeStateReducer } from './ui.reducer'
import { loadingBarReducer } from 'react-redux-loading-bar'
import { alert } from './alert.reducer'
import loginReducer from '../views/pages/login/reducer'
import userReducer from '../views/pages/users/reducer'

const rootReducer = combineReducers({
  changeState: changeStateReducer,
  loadingBar: loadingBarReducer,
  alert,
  login: loginReducer,
  users: userReducer,
})

export default rootReducer
