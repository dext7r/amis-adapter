import './public-path'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/css/v4-shims.css'
import 'amis/lib/themes/default.css'
import 'amis/lib/helper.css'
import 'amis/sdk/iconfont.css'
import 'amis-editor/dist/style.css'
import './scss/index.scss'
import { setToken } from './utils/request'

interface Props {
  container?: any
  data: any
}

let root: ReactDOM.Root
function render(props: Props) {
  const { container } = props
  root = ReactDOM.createRoot(
    container ? container.querySelector('#root') : document.getElementById('root') as HTMLElement,
  )

  root.render(
    // <React.StrictMode>
    <App />,
    // </React.StrictMode>
  )
}

if (!window.__POWERED_BY_QIANKUN__)
  render({ data: {} })

export async function bootstrap() {
  // eslint-disable-next-line no-console
  console.log('editor app bootstraped')
}

export async function mount(props: Props) {
  setToken(props.data.token)
  render(props)
}

export async function unmount() {
  root.unmount()
}
