import api from '../../../utils/api'
import * as t from './constant'
import { USER_PROFILE_PUBLIC_UPDATE_FAILURE } from './constant'

function getAccount() {
  return (dispatch) => {
    dispatch(request())
    return api.userService
      .getAccount()
      .then((response) => dispatch(success(response.data)))
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.ACCOUNT_GET_REQUEST }
  }

  function success(account) {
    return { type: t.ACCOUNT_GET_SUCCESS, account }
  }

  function failure(error) {
    return { type: t.ACCOUNT_GET_FAILURE, error }
  }
}

function getAllUsers(data) {
  return (dispatch) => {
    dispatch(request())
    return api.userService
      .getAllUsers(data)
      .then((response) => {
        dispatch(success(response))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.USERS_GET_REQUEST }
  }

  function success(response) {
    return { type: t.USERS_GET_SUCCESS, response }
  }

  function failure(error) {
    return { type: t.USERS_GET_FAILURE, error }
  }
}

function getAllProfileUsers(data) {
  return (dispatch) => {
    dispatch(request())
    return api.userService
      .getAllProfileUsers(data)
      .then((response) => {
        dispatch(success(response))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.USER_PROFILE_GET_ALL_REQUEST }
  }

  function success(response) {
    return { type: t.USER_PROFILE_GET_ALL_SUCCESS, response }
  }

  function failure(error) {
    return { type: t.USER_PROFILE_GET_ALL_FAILURE, error }
  }
}

function getProfile(data) {
  return (dispatch) => {
    dispatch(request())
    return api.userService
      .getProfileById(data)
      .then((response) => dispatch(success(response.data)))
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.USER_GET_REQUEST }
  }

  function success(user) {
    return { type: t.USER_GET_SUCCESS, user }
  }

  function failure(error) {
    return { type: t.USER_GET_FAILURE, error }
  }
}

function updatePublicUserProfile(data) {
  return (dispatch) => {
    dispatch(request())
    return api.userService
      .updatePublicUserProfile(data)
      .then((response) => dispatch(success(response.data)))
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.USER_PROFILE_PUBLIC_UPDATE_REQUEST }
  }

  function success(user) {
    return { type: t.USER_PROFILE_PUBLIC_UPDATE_SUCCESS, user }
  }

  function failure(error) {
    return { type: t.USER_PROFILE_PUBLIC_UPDATE_FAILURE, error }
  }
}

function updateUserProfile(data) {
  return (dispatch) => {
    dispatch(request())
    return api.userService
      .updateUserProfile(data)
      .then((response) => dispatch(success(response.data)))
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.USER_PROFILE_UPDATE_REQUEST }
  }

  function success(user) {
    return { type: t.USER_PROFILE_UPDATE_SUCCESS, user }
  }

  function failure(error) {
    return { type: t.USER_PROFILE_UPDATE_FAILURE, error }
  }
}

function addOrUpdateUserAddress(data) {
  return (dispatch) => {
    dispatch(request())
    return api.userService
      .addOrUpdateUserAddresses(data)
      .then((response) => dispatch(success(response.data)))
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.ADD_UPDATE_USER_ADDRESSES_REQUEST }
  }

  function success(userAddress) {
    return { type: t.ADD_UPDATE_USER_ADDRESSES_SUCCESS, userAddress }
  }

  function failure(error) {
    return { type: t.ADD_UPDATE_USER_ADDRESSES_FAILURE, error }
  }
}

function createQuestion(data) {
  return (dispatch) => {
    dispatch(request())
    return api.questionnaireService
      .createQuestion(data)
      .then((response) => dispatch(success(response.data)))
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.CREATE_QUESTION_REQUEST }
  }

  function success(question) {
    return { type: t.CREATE_QUESTION_SUCCESS, question }
  }

  function failure(error) {
    return { type: t.CREATE_QUESTION_FAILURE, error }
  }
}

function updateQuestion(data) {
  return (dispatch) => {
    dispatch(request())
    return api.questionnaireService
      .updateQuestion(data)
      .then((response) => dispatch(success(response.data)))
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.UPDATE_QUESTION_REQUEST }
  }

  function success(question) {
    return { type: t.UPDATE_QUESTION_SUCCESS, question }
  }

  function failure(error) {
    return { type: t.UPDATE_QUESTION_FAILURE, error }
  }
}

export const userActions = {
  addOrUpdateUserAddress,
  getAccount,
  getAllUsers,
  getAllProfileUsers,
  getProfile,
  createQuestion,
  updateQuestion,
  updatePublicUserProfile,
  updateUserProfile,
}
