import axios from 'axios'
import { setInterceptors } from './common/interceptors'

function createInstance() {
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL
  })
}

function createInstanceWithAuth() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  })
  return setInterceptors(instance)
}

export const instance = createInstance()
export const authInstance = createInstanceWithAuth()
