import React, {useState} from 'react'
import './App.css'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {
  const [isEditable, setIsEditable] = useState(false)
  const [updateID, setUpdateID] = useState(0)

  return (
    <>
      <h1>Learn about redux toolkit</h1>
      <AddTodo value = {{isEditable,setIsEditable,updateID,setUpdateID}}/>
      <Todos value = {{isEditable,setIsEditable,updateID,setUpdateID}}/>
    </>
  )
}

export default App
