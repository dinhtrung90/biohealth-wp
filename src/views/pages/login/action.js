import { APP_TOKEN, APP_REFRESH_TOKEN } from 'src/constants/constants'
import api from '../../../utils/api'
import * as t from './constant'

function login(data) {
  return (dispatch) => {
    dispatch(request())
    return api.authService
      .login(data)
      .then(dispatch(success(data)))
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.LOGIN_REQUEST }
  }

  function success(data) {
    return { type: t.LOGIN_SUCCESS, data }
  }

  function failure(error) {
    return { type: t.LOGIN_FAILURE, error }
  }
}

export const loginActions = {
  login,
}
