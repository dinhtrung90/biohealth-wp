import * as t from './constant'
import { APP_USER } from '../../../constants'

const initialState = {
  isFetched: false,
  isFetching: false,
  provinces: [],
  districts: [],
  wards: [],
  quarterTree: [],
  isFetchedQuarter: false,
  totalPages: 0,
  itemsPerPage: 10,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.PROVINCE_GET_ALL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.PROVINCE_GET_ALL_SUCCESS:
      action.provinces.forEach((p) => {
        p.value = p.id
        p.label = p.name
      })
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        provinces: action.provinces,
      })
    case t.PROVINCE_GET_ALL_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.DISTRICT_GET_ALL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.DISTRICT_GET_ALL_SUCCESS:
      action.districts.forEach((p) => {
        p.value = p.id
        p.label = p.name
      })
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        districts: action.districts,
      })
    case t.DISTRICT_GET_ALL_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.WARD_GET_ALL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.WARD_GET_ALL_SUCCESS:
      action.wards.forEach((p) => {
        p.value = p.id
        p.label = p.name
      })
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        wards: action.wards,
      })
    case t.WARD_GET_ALL_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.UPDATE_QUARTER_TREE_REQUEST:
      return Object.assign({}, state, {
        isFetchedQuarter: false,
      })
    case t.UPDATE_QUARTER_TREE_SUCCESS:
      return Object.assign({}, state, {
        isFetchedQuarter: true,
        quarterTree: action.data,
      })
    default:
      return state
  }
}

export default userReducer
