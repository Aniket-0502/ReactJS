import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {
  let myObj = {
    username : "Aniket",
    age:20
  }
  let myArr = [0,1,2,3]

  return (
    <>
      <Card channel = "Chai aur Code" someObj = {myObj} someArr = {myArr}/>
    </>
  )
}

export default App
