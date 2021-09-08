import axios from 'axios'
import { BASE_URL } from 'src/constants/constants'

const getAccount = (data) => {
  return axios.get(BASE_URL + `/api/account`)
}

const getProfileById = (data) => {
  return axios.get(BASE_URL + `/api/profile/${data.userId}`)
}

const updatePublicUserProfile = (data) => {
  return axios.post(BASE_URL + `/api/profile`, data)
}

const updateUserProfile = (data) => {
  if (data && data.id) {
    return axios.put(BASE_URL + `/api/user-profiles/${data.id}`, data)
  }
  return axios.post(BASE_URL + `/api/user-profiles`, data)
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

const addOrUpdateUserAddresses = (data) => {
  return axios.post(BASE_URL + `/api/user-addresses`, data)
}

const deleteUserAddresses = (addressId) => {
  return axios.delete(BASE_URL + `/api/user-addresses/${addressId}`)
}

export const userService = {
  addOrUpdateUserAddresses,
  deleteUserAddresses,
  getAccount,
  getAllUsers,
  getProfileById,
  getAllProfileUsers,
  updatePublicUserProfile,
  updateUserProfile,
}
