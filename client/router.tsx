import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import App from './components/App'
import Home from './components/Home'
import Rounds from './components/Rounds'
import Round from './components/Round'
import CurrentRound from './components/CurrentRound'
import Statistics from './components/Statistics'
import Charts from './components/Charts'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/rounds" element={<Rounds />} />
      <Route path="/round/:id" element={<Round />} />
      <Route path="/current" element={<CurrentRound />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/chart" element={<Charts />} />
    </Route>
  )
)

export default router
