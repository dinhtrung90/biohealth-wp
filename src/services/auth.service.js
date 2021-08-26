import axios from 'axios'
import { BASE_URL } from 'src/constants/constants'

const health = () => {
  return axios.get(BASE_URL + '/management/health')
}

const login = (data) => {
  return axios.post(BASE_URL + '/api/authenticate', data)
}

const updateUserAdmin = (data) => {
  return axios.put(BASE_URL + `/api/admin/users`, data)
}

export const authService = {
  login,
  health,
  updateUserAdmin,
}
