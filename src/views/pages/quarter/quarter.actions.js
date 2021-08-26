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

function getHotLinesByWard(wardId) {
  return (dispatch) => {
    dispatch(request())
    return api.provinceService
      .getHotlinesByWard(wardId)
      .then((response) => dispatch(success(response.data)))
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.HOTLINE_BY_WARD_GET_REQUEST }
  }

  function success(hotlines) {
    return { type: t.HOTLINE_BY_WARD_GET_SUCCESS, hotlines }
  }

  function failure(error) {
    return { type: t.HOTLINE_BY_WARD_GET_FAILURE, error }
  }
}

function addUpdateHotLines(data) {
  return (dispatch) => {
    dispatch(request())
    return api.provinceService
      .addUpdateHotlines(data)
      .then((response) => dispatch(success(response.data)))
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.CREATE_UPDATE_HOTLINE_REQUEST }
  }

  function success(hotlines) {
    return { type: t.CREATE_UPDATE_HOTLINE_SUCCESS, hotlines }
  }

  function failure(error) {
    return { type: t.CREATE_UPDATE_HOTLINE_FAILURE, error }
  }
}

function getAllGroups() {
  return (dispatch) => {
    dispatch(request())
    return api.provinceService
      .getAllGroups()
      .then((response) => dispatch(success(response.data)))
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.GROUPS_GET_ALL_REQUEST }
  }

  function success(groups) {
    return { type: t.GROUPS_GET_ALL_SUCCESS, groups }
  }

  function failure(error) {
    return { type: t.GROUPS_GET_ALL_FAILURE, error }
  }
}

function createGroups(data) {
  return (dispatch) => {
    dispatch(request())
    return api.provinceService
      .createGroups(data)
      .then((response) => dispatch(success(response.data)))
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.CREATE_GROUP_ADDRESS_REQUEST }
  }

  function success(group) {
    return { type: t.CREATE_GROUP_ADDRESS_SUCCESS, group }
  }

  function failure(error) {
    return { type: t.CREATE_GROUP_ADDRESS_FAILURE, error }
  }
}

function createGroupTree(data) {
  return (dispatch) => {
    dispatch(request())
    return api.provinceService
      .createGroupTree(data)
      .then((response) => dispatch(success(response.data)))
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.CREATE_GROUP_TREE_ADDRESS_REQUEST }
  }

  function success(group) {
    return { type: t.CREATE_GROUP_TREE_ADDRESS_SUCCESS, group }
  }

  function failure(error) {
    return { type: t.CREATE_GROUP_TREE_ADDRESS_FAILURE, error }
  }
}

function getGroupByWardId(wardId) {
  return (dispatch) => {
    dispatch(request())
    return api.provinceService
      .getGroupByWardId(wardId)
      .then((response) => dispatch(success(response.data)))
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.GROUP_WARD_ID_GET_REQUEST }
  }

  function success(items) {
    return { type: t.GROUP_WARD_ID_GET_SUCCESS, items }
  }

  function failure(error) {
    return { type: t.GROUP_WARD_ID_GET_FAILURE, error }
  }
}

function getGroupById(id) {
  return (dispatch) => {
    dispatch(request())
    return api.provinceService
      .getGroupById(id)
      .then((response) => dispatch(success(response.data)))
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.GROUP_ID_GET_REQUEST }
  }

  function success(item) {
    return { type: t.GROUP_ID_GET_SUCCESS, item }
  }

  function failure(error) {
    return { type: t.GROUP_ID_GET_FAILURE, error }
  }
}

export const quarterActions = {
  getAllProvinces,
  getAllDistrictsByProvince,
  getAllWardsByDistrict,
  updateQuarterTree,
  getHotLinesByWard,
  addUpdateHotLines,
  getAllGroups,
  createGroups,
  createGroupTree,
  getGroupByWardId,
  getGroupById,
}
