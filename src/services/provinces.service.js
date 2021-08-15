import axios from 'axios'
import { BASE_URL } from 'src/constants/constants'

const listProvinces = () => {
  return axios.get(BASE_URL + `/api/provinces?page=0&size=1000`)
}

const getProvince = (id) => {
  return axios.get(BASE_URL + `/api/provinces/${id}`)
}

const listDistricts = (province) => {
  if (province && province.id) {
    return axios.get(BASE_URL + `/api/districts?page=0&size=1000&provinceId.equals=${province.id}`)
  }
  return axios.get(BASE_URL + `/api/districts?page=0&size=1000`)
}

const getDistrict = (id) => {
  return axios.get(BASE_URL + `/api/districts/${id}`)
}

const listWards = (district) => {
  if (district && district.id) {
    return axios.get(BASE_URL + `/api/wards?page=0&size=1000&districtId.equals=${district.id}`)
  }
  return axios.get(BASE_URL + `/api/wards?page=0&size=1000`)
}

const getWard = (id) => {
  return axios.get(BASE_URL + `/api/wards/${id}`)
}

const getHotlinesByWard = (wardId) => {
  return axios.get(BASE_URL + `/api/hotlines?wardId.equals=${wardId}`)
}

const getHotlinesById = (id) => {
  return axios.get(BASE_URL + `/api/hotlines/${id}`)
}

const addUpdateHotlines = (data) => {
  return axios.post(BASE_URL + `/api/hotlines`, data)
}

const getAllGroups = (id) => {
  return axios.get(BASE_URL + `/api/hotlines/${id}`)
}

export const provinceService = {
  listProvinces,
  getProvince,
  listDistricts,
  getDistrict,
  listWards,
  getWard,
  getHotlinesById,
  getHotlinesByWard,
  addUpdateHotlines,
}
