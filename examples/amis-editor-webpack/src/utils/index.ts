import type { RenderOptions, ToastLevel } from 'amis-core'
import { alert, confirm, toast } from 'amis'
// import { RenderOptions } from "amis/lib/factory";
import axios from './request'

export function fetcher({ url, method, data, config, headers }: any): Promise<any> {
  config = config || {}
  config.headers = config.headers || headers || {}
  config.withCredentials = true

  if (method !== 'post' && method !== 'put' && method !== 'patch') {
    if (data)
      config.params = data

    return (axios as any)[method](url, config)
  }
  else if (data && data instanceof FormData) {
    // config.headers = config.headers || {};
    // config.headers['Content-Type'] = 'multipart/form-data';
  }
  else if (
    data
    && typeof data !== 'string'
    && !(data instanceof Blob)
    && !(data instanceof ArrayBuffer)
  ) {
    data = JSON.stringify(data)
    config.headers['Content-Type'] = 'application/json'
  }

  return (axios as any)[method](url, data, config)
}

export function makeEnv(env?: RenderOptions): RenderOptions {
  return {
    fetcher,
    isCancel: () => false,
    notify: (type: ToastLevel, msg: string) => {
      toast[type]
        ? toast[type](msg, type === 'error' ? '系统错误' : '系统消息')
        : console.warn('[Notify]', type, msg)
        // eslint-disable-next-line no-console
      console.log('[notify]', type, msg)
    },
    // eslint-disable-next-line unused-imports/no-unused-vars
    jumpTo: (to, action, ctx) => {
      // eslint-disable-next-line no-console
      console.log(`jump to${to}`)
    },
    alert,
    confirm,
    ...env,
  }
}
