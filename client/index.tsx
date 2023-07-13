import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import Modal from 'react-modal'

import store from './store'
import router from './router'

import './styles/index.scss'

Modal.setAppElement(document.getElementById('app') as HTMLElement)

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
})
