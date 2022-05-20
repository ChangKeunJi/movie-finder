import axios, { AxiosError, AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const requestError = (error: any): any => {
  return Promise.reject(error)
}

const resolveResponse = (response: AxiosResponse): AxiosResponse => response

const responseError = (error: AxiosError): Promise<never> => {
  // eslint-disable-next-line no-console
  return Promise.reject(error)
}

instance.interceptors.request.use((config) => config, requestError)
instance.interceptors.response.use(resolveResponse, responseError)

export { instance }
