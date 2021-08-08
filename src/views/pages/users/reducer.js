import * as t from './constant'
import { APP_USER } from '../../../constants'

const initialState = {
  isFetched: false,
  isFetching: false,
  account: null,
  user: null,
  users: [],
  totalPages: 0,
  itemsPerPage: 10,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.ACCOUNT_GET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.ACCOUNT_GET_SUCCESS:
      localStorage.setItem(
        APP_USER,
        JSON.stringify({
          userId: action.account.id,
          authorities: action.account.authorities,
        }),
      )
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        user: action.account,
      })
    case t.ACCOUNT_GET_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.USERS_GET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.USERS_GET_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        users: action.response.data,
        totalPages: Math.ceil(action.response.headers['x-total-count'] / state.itemsPerPage),
      })
    case t.USERS_GET_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.USER_PROFILE_GET_ALL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.USER_PROFILE_GET_ALL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        users: action.response.data,
        totalPages: Math.ceil(action.response.headers['x-total-count'] / state.itemsPerPage),
      })
    case t.USER_PROFILE_GET_ALL_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.USER_GET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.USER_GET_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        user: action.user,
      })
    case t.USER_GET_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    default:
      return state
  }
}

export default userReducer
