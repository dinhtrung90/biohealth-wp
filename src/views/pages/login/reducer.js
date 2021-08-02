import * as t from './constant'
import { APP_TOKEN } from 'src/constants/constants'

const initialState = {
  isAuthenticated: false,
  isFetched: false,
  isFetching: false,
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      })
    case t.LOGIN_SUCCESS:
      localStorage.setItem(APP_TOKEN, action.data.id_token)
      const token = localStorage.getItem(APP_TOKEN)
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        isAuthenticated: token && token.length > 0,
      })
    case t.LOGIN_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
        isAuthenticated: false,
      })
    default:
      return state
  }
}

export default loginReducer
