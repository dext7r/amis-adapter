import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastComponent } from 'amis-ui'
import PageEditor from './editor'
import PageShow from './show'

function App() {
  return (
    <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/editor-app' : '/'}>
      <Routes>
        <Route path="/" element={<PageEditor />}></Route>
        <Route path="/edit/:pageId" element={<PageEditor />}></Route>
        <Route path="/show/:pageId" element={<PageShow />}></Route>
      </Routes>

      <ToastComponent></ToastComponent>
    </BrowserRouter>
  )
}

export default App
