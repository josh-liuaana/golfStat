import { useNavigate } from 'react-router-dom'

function Nav() {
  const navigate = useNavigate()
  return (
    <div className="nav-container">
      <img
        src="../../images/logo.png"
        alt="App gS logo"
        onClick={() => navigate('/')}
        aria-hidden="true"
      />
      <h1>golfStat</h1>
      <button disabled={true}>logout</button>
    </div>
  )
}

export default Nav
