import axios from 'axios'
const BASE_URL = process.env.REACT_APP_PROVINCE_ENDPOINT

const showAllDivisions = () => {
  return axios.get(BASE_URL + '/api')
}

const listProvinces = () => {
  return axios.get(BASE_URL + '/api/p')
}

const searchProvinces = (q) => {
  return axios.get(BASE_URL + `/api/p/search/?q=${q}`)
}

const getProvince = (code) => {
  return axios.get(BASE_URL + `/api/p/${code}`)
}

const listDistricts = () => {
  return axios.get(BASE_URL + '/api/d')
}

const searchDistricts = (query) => {
  return axios.get(BASE_URL + `/api/d/search/?q=${query.q}&p=${query.p}`)
}

const getDistrict = (code) => {
  return axios.get(BASE_URL + `/api/d/${code}`)
}

const listWards = () => {
  return axios.get(BASE_URL + '/api/w')
}

const searchWards = (query) => {
  return axios.get(BASE_URL + `/api/w/search/?q=${query.q}&d=${query.d}&p=${query.p}`)
}

const getWard = (code) => {
  return axios.get(BASE_URL + `/api/w/${code}`)
}

export const provinceService = {
  showAllDivisions,
  listProvinces,
  searchProvinces,
  getProvince,
  listDistricts,
  searchDistricts,
  getDistrict,
  listWards,
  searchWards,
  getWard,
}
