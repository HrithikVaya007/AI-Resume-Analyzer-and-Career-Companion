import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/landing/LandingPage'
import Login from './components/auth/LoginForm'
import Register from './components/auth/RegisterForm'
import ForgotPassword from './components/auth/ForgotPasswordForm'
import Dashboard from './dashboard/Dashboard'
import ResumeCard from './resume/ResumeCard'
import Questiongenerator from './questions/Questiongenerator'
import SimulatorLayout from './simulator/SimulatorLayout'


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/forgotpassword" element={<ForgotPassword/>} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/resume-analyze" element={<ResumeCard/>}/>
       <Route path="/question-gen" element={<Questiongenerator/>}/>
       <Route path="/ai-simulator" element={<SimulatorLayout/>}/>
       
    </Routes>
  )
}

export default App