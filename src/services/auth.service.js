import axios from 'axios'
import { BASE_URL } from 'src/constants/constants'

const health = () => {
  return axios.get(BASE_URL + '/management/health')
}

const login = (data) => {
  return axios.post(BASE_URL + '/api/authenticate', data)
}

export const authService = {
  login,
  health,
}
