import axios, { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: '/api',
})

export { AxiosError }
