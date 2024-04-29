import axios from 'axios'
import { toast } from 'amis-ui'

const app = {
  token: '',
}

export function setToken(token: string) {
  app.token = token
}

export function getToken() {
  return app.token
}

const instance = axios.create({
  baseURL: window.__POWERED_BY_QIANKUN__ ? '/base/url/' : '/',
  timeout: 10000,
})

instance.interceptors.request.use((config) => {
  if (!config.headers)
    config.headers = {}

  if (app.token)
    config.headers['X-Access-Token'] = app.token

  return config
})

instance.interceptors.response.use(
  (resp) => {
    return resp && resp.data
  },
  (error) => {
    toast.error(error.message)
    return Promise.reject(error)
  },
)

export default instance
