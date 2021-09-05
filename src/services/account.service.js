import axios from 'axios'
import { BASE_URL } from 'src/constants/constants'

const activeAccount = (key) => {
  return axios.get(BASE_URL + `/api/activate?key=${key}`)
}

const changePassword = (data) => {
  return axios.post(BASE_URL + '/api/account/change-password', data)
}

const resetPasswordInit = (data) => {
  return axios.post(BASE_URL + '/api/account/reset-password/init', data)
}

const resetPasswordFinish = (data) => {
  return axios.post(BASE_URL + '/api/account/reset-password/finish', data)
}

const registerAccount = (data) => {
  return axios.post(BASE_URL + '/api/register', data)
}

export const accountService = {
  activeAccount,
  changePassword,
  resetPasswordInit,
  resetPasswordFinish,
  registerAccount,
}
