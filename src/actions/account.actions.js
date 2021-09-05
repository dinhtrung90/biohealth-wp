import api from '../utils/api'
import { accountConstants } from '../constants/constants'
import { toast } from 'react-toastify'

const activateAccount = (data) => {
  return (dispatch) => {
    dispatch(request())
    return api.accountService
      .activeAccount(data)
      .then((response) => {
        toast.success('Kích hoạt thành công.')
        dispatch(success(response))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: accountConstants.ACTIVE_ACCOUNT_REQUEST }
  }

  function success(response) {
    return { type: accountConstants.ACTIVE_ACCOUNT_SUCCESS, response }
  }

  function failure(error) {
    return { type: accountConstants.ACTIVE_ACCOUNT_FAILURE, error }
  }
}

const registerAccount = (data) => {
  return (dispatch) => {
    dispatch(request())
    return api.accountService
      .registerAccount(data)
      .then((response) => {
        toast.success('Đăng ký thành công.')
        dispatch(success(response))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: accountConstants.REGISTER_ACCOUNT_REQUEST }
  }

  function success(response) {
    return { type: accountConstants.REGISTER_ACCOUNT_SUCCESS, response }
  }

  function failure(error) {
    return { type: accountConstants.REGISTER_ACCOUNT_FAILURE, error }
  }
}

const resetPasswordInit = (data) => {
  return (dispatch) => {
    dispatch(request())
    return api.accountService
      .resetPasswordInit(data)
      .then((response) => {
        toast.success(
          'Thiết lập mật khẩu thành công. Vui lòng đăng nhập email của bạn để xác nhận.',
        )
        dispatch(success(response))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: accountConstants.RESET_PASSWORD_INIT_REQUEST }
  }

  function success(response) {
    return { type: accountConstants.RESET_PASSWORD_INIT_SUCCESS, response }
  }

  function failure(error) {
    return { type: accountConstants.RESET_PASSWORD_INIT_FAILURE, error }
  }
}

const updateChangePassword = (data) => {
  return (dispatch) => {
    dispatch(request())
    return api.accountService
      .changePassword(data)
      .then((response) => {
        toast.success('Đổi mật khẩu thành công.')
        dispatch(success(response))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: accountConstants.UPDATE_CHANGE_PASSWORD_REQUEST }
  }

  function success(response) {
    return { type: accountConstants.UPDATE_CHANGE_PASSWORD_SUCCESS, response }
  }

  function failure(error) {
    return { type: accountConstants.UPDATE_CHANGE_PASSWORD_FAILURE, error }
  }
}

export const accountActions = {
  activateAccount,
  registerAccount,
  resetPasswordInit,
  updateChangePassword,
}
