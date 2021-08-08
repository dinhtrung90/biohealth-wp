import axios from 'axios'
import { BASE_URL } from 'src/constants/constants'

const getAccount = (data) => {
  return axios.get(BASE_URL + `/api/account`)
}

const getProfileById = (data) => {
  return axios.get(BASE_URL + `/api/profile/${data.userId}`)
}

const getAllUsers = (data) => {
  if (data && data.all) {
    return axios.get(BASE_URL + `/api/admin/users`)
  }
  return axios.get(BASE_URL + `/api/admin/users?page=${data.page}&size=${data.size}`)
}

const getAllProfileUsers = (data) => {
  if (data && data.all) {
    return axios.get(BASE_URL + `/api/user-profiles`)
  }
  return axios.get(BASE_URL + `/api/user-profiles?page=${data.page}&size=${data.size}`)
}

export const userService = {
  getAccount,
  getAllUsers,
  getProfileById,
  getAllProfileUsers,
}
