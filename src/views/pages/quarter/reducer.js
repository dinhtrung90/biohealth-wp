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
  allGroups: [],
  group: null,
  hotlinesByWard: {
    districtHealthPhone: '',
    mobileLeader: '',
    wardHealthyPhone: '',
    wardPhone: '',
    wardPolice: '',
  },
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
        districts: [],
        wards: [],
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
        wards: [],
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
    case t.HOTLINE_BY_WARD_GET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.HOTLINE_BY_WARD_GET_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        hotlinesByWard:
          action.hotlines && action.hotlines.length > 0
            ? action.hotlines[0]
            : {
                districtHealthPhone: '',
                mobileLeader: '',
                wardHealthyPhone: '',
                wardPhone: '',
                wardPolice: '',
              },
      })
    case t.HOTLINE_BY_WARD_GET_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.CREATE_UPDATE_HOTLINE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.CREATE_UPDATE_HOTLINE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
      })
    case t.CREATE_UPDATE_HOTLINE_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.GROUP_WARD_ID_GET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetchedQuarter: false,
      })
    case t.GROUP_WARD_ID_GET_SUCCESS:
      const items = action.items
      if (items && items.length > 0) {
        items.forEach((i) => {
          i.title = i.name
          i.expanded = true
          i.uuid = i.id
          if (i.children && i.children.length > 0) {
            i.children.forEach((child) => {
              child.title = child.name
              child.uuid = child.id
              child.expanded = true
            })
          }
        })
      }
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        isFetchedQuarter: true,
        quarterTree: items,
      })
    case t.GROUP_WARD_ID_GET_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.GROUPS_GET_ALL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.GROUPS_GET_ALL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        allGroups: action.response.data,
        totalPages: Math.ceil(action.response.headers['x-total-count'] / state.itemsPerPage),
      })
    case t.GROUPS_GET_ALL_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.GROUP_ID_GET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetchedQuarter: false,
        group: null,
      })
    case t.GROUP_ID_GET_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        isFetchedQuarter: true,
        group: action.item,
      })
    case t.GROUP_ID_GET_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    default:
      return state
  }
}

export default userReducer
