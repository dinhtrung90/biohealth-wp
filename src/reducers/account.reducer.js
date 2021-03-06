import { accountConstants } from '../constants'

const initialState = {
  isFetched: false,
  isFetching: false,
}

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case accountConstants.ACTIVE_ACCOUNT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case accountConstants.ACTIVE_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
      })
    case accountConstants.ACTIVE_ACCOUNT_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case accountConstants.REGISTER_ACCOUNT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case accountConstants.REGISTER_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
      })
    case accountConstants.REGISTER_ACCOUNT_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case accountConstants.RESET_PASSWORD_INIT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case accountConstants.RESET_PASSWORD_INIT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
      })
    case accountConstants.RESET_PASSWORD_INIT_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case accountConstants.UPDATE_CHANGE_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case accountConstants.UPDATE_CHANGE_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
      })
    case accountConstants.UPDATE_CHANGE_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    default:
      return state
  }
}
export default accountReducer
