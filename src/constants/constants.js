export const APP_TOKEN = 'APP_TOKEN'
export const APP_REFRESH_TOKEN = 'APP_REFRESH_TOKEN'
export const APP_USER = 'APP_USER'

export const alertConstants = {
  SUCCESS: 'ALERT_SUCCESS',
  ERROR: 'ALERT_ERROR',
  CLEAR: 'ALERT_CLEAR',
}

export const accountConstants = {
  UPDATE_CHANGE_PASSWORD_REQUEST: 'UPDATE_CHANGE_PASSWORD_REQUEST',
  UPDATE_CHANGE_PASSWORD_SUCCESS: 'UPDATE_CHANGE_PASSWORD_SUCCESS',
  UPDATE_CHANGE_PASSWORD_FAILURE: 'UPDATE_CHANGE_PASSWORD_FAILURE',
}

export const DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN || ''

export const BASE_URL = process.env.REACT_APP_API_ENDPOINT || 'https://api.elend.vn'

export const SERVICE_DOMAIN = '/services/clientcenterservice'
