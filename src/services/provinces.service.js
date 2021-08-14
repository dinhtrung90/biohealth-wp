import axios from 'axios'
import { BASE_URL } from 'src/constants/constants'

// const showAllDivisions = () => {
//   return axios.get(BASE_URL + '/api')
// }
//
// const listProvinces = () => {
//   return axios.get(BASE_URL + '/api/p')
// }
//
// const searchProvinces = (q) => {
//   return axios.get(BASE_URL + `/api/p/search/?q=${q}`)
// }
//
// const getProvince = (code) => {
//   return axios.get(BASE_URL + `/api/p/${code}`)
// }
//
// const listDistricts = () => {
//   return axios.get(BASE_URL + '/api/d')
// }
//
// const searchDistricts = (query) => {
//   return axios.get(BASE_URL + `/api/d/search/?q=${query.q}&p=${query.p}`)
// }
//
// const getDistrict = (code) => {
//   return axios.get(BASE_URL + `/api/d/${code}`)
// }
//
// const listWards = () => {
//   return axios.get(BASE_URL + '/api/w')
// }
//
// const searchWards = (query) => {
//   return axios.get(BASE_URL + `/api/w/search/?q=${query.q}&d=${query.d}&p=${query.p}`)
// }
//
// const getWard = (code) => {
//   return axios.get(BASE_URL + `/api/w/${code}`)
// }

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

export const provinceService = {
  // showAllDivisions,
  listProvinces,
  // searchProvinces,
  getProvince,
  listDistricts,
  // searchDistricts,
  getDistrict,
  listWards,
  // searchWards,
  getWard,
  getHotlinesById,
  getHotlinesByWard,
  addUpdateHotlines,
}
