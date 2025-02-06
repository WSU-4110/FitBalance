import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './front-end/Home'
import Workout from './front-end/Workout'


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Workout></Workout>
  </StrictMode>
)
