import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'
import axios from 'axios'
import './index.css'

axios.get('http://localhost:3001/persons').then(response => {
  const persons = response.data
  ReactDOM.render(
    <App persons={persons} />,
    document.getElementById('root')
  )
})