import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from "./pages/Auth/Login"
import Notfound from "./pages/Notfound"
import Dashboard from "./pages/Dashboard/Dashboard"




function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </Router>
  )
}

export default App
