import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'
import Modal from 'react-modal'

import App from './components/App'

Modal.setAppElement(document.getElementById('app') as HTMLElement)

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  )
})