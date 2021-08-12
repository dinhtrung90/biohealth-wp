import api from '../utils/api'
import { accountConstants } from '../constants/constants'
import { toast } from 'react-toastify'

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
  updateChangePassword,
}
