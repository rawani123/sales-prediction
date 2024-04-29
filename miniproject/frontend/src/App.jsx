import React from 'react'
import {Routes,Route,BrowserRouter as Router} from 'react-router-dom'
import Chart from './components/Chart'
import Mlmodel from './components/Mlmodel'


const App = () => {
  return (
    <div className='bg-blue-200 w-screen'>
    
    <Routes>
      <Route path="/" element={<Chart/>}/>
      <Route path="/prediction" element={<Mlmodel/>}/>
    </Routes>
    </div>
  )
}

export default App
