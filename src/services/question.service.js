import axios from 'axios'
import { BASE_URL } from 'src/constants/constants'

const getAllQuestions = () => {
  return axios.get(BASE_URL + `/api/questionnaires`)
}

const createQuestion = (data) => {
  return axios.post(BASE_URL + `/api/questionnaires`, data)
}

const updateQuestion = (data) => {
  return axios.put(BASE_URL + `/api/questionnaires/${data.id}`, data)
}

export const questionnaireService = {
  getAllQuestions,
  createQuestion,
  updateQuestion,
}
