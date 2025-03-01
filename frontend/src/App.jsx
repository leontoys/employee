import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";

function App() {
  const [message, setMessage] = useState('')
  const baseUrl = "http://localhost:5000/"

  useEffect(()=>{
    axios.get(`${baseUrl}`)
    .then(response=>setMessage(response.data))
    .catch(error=>console.error(error))
  },[])

  return (
    <div>
      <h1>MERN Stack App</h1>
      <p>{message}</p>
    </div>
  )
}

export default App
