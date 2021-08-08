import api from '../../../utils/api'
import * as t from './constant'
import { DISTRICT_GET_ALL_REQUEST } from './constant'

function getAllProvinces() {
  return (dispatch) => {
    dispatch(request())
    return api.provinceService
      .listProvinces()
      .then((response) => dispatch(success(response.data)))
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.PROVINCE_GET_ALL_REQUEST }
  }

  function success(provinces) {
    return { type: t.PROVINCE_GET_ALL_SUCCESS, provinces }
  }

  function failure(error) {
    return { type: t.PROVINCE_GET_ALL_FAILURE, error }
  }
}

function getAllDistrictsByProvince(data) {
  return (dispatch) => {
    dispatch(request())
    return api.provinceService
      .listDistricts(data)
      .then((response) => dispatch(success(response.data)))
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.DISTRICT_GET_ALL_REQUEST }
  }

  function success(districts) {
    return { type: t.DISTRICT_GET_ALL_SUCCESS, districts }
  }

  function failure(error) {
    return { type: t.DISTRICT_GET_ALL_FAILURE, error }
  }
}

function getAllWardsByDistrict(data) {
  return (dispatch) => {
    dispatch(request())
    return api.provinceService
      .listWards(data)
      .then((response) => dispatch(success(response.data)))
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.WARD_GET_ALL_REQUEST }
  }

  function success(wards) {
    return { type: t.WARD_GET_ALL_SUCCESS, wards }
  }

  function failure(error) {
    return { type: t.WARD_GET_ALL_FAILURE, error }
  }
}

function updateQuarterTree(data) {
  return (dispatch) => {
    dispatch(request())
    dispatch(success(data))
  }

  function request() {
    return { type: t.UPDATE_QUARTER_TREE_REQUEST }
  }

  function success(data) {
    return { type: t.UPDATE_QUARTER_TREE_SUCCESS, data }
  }
}

export const quarterActions = {
  getAllProvinces,
  getAllDistrictsByProvince,
  getAllWardsByDistrict,
  updateQuarterTree,
}
