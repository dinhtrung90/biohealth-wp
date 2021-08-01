import { combineReducers } from 'redux'
import { changeStateReducer } from './ui.reducer'
import { loadingBarReducer } from 'react-redux-loading-bar'
import { alert } from './alert.reducer'
import loginReducer from '../views/pages/login/reducer'

const rootReducer = combineReducers({
  changeState: changeStateReducer,
  loadingBar: loadingBarReducer,
  alert,
  login: loginReducer,
})

export default rootReducer
