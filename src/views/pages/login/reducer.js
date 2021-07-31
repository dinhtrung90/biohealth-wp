import * as t from './constant'

const initialState = {
  user: null,
  isFetched: false,
  isFetching: false,
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        user: action.data,
      })
    case t.LOGIN_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    default:
      return state
  }
}

export default loginReducer
