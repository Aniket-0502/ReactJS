# This is a project walk through

### A little para about react
React helps us build SPA(Single Page Applications), 

### Starting 
For this project we are using Vite, which is light compared to the standard method to install all the node modules. Standard method is to write in terminal :- ```npx create-react-app```  (**npx** &rarr; Node Package Executer)

**Terminal command to install through Vite**  ```npm create vite@latest```
index.js / main.jsx &rarr; is the entry point of react applications
App.jsx &rarr; is nothing but an js function returning HTML code and then we export it, now react just renders the HTML returned by App.jsx

_While creating components(.jsx files) always keep the first letter of the variable capital and also remember that one component can export only one HTML component_

_Since it is a very common problem that we always needed to wrap the content in a div to export that react created empty tags ```<> </>``` which are also called fragments_

* Injecting variables in React HTML : 
```javascript
function App() {
//injecting variables
  const username = "Aniket"
  return (
    <h1>Chai aur Code {username}</h1>
  )
}
export default App
```
* Creating custom react elements and rendering it
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
// For creating react elements we use.createElement i/p as object, and that object syntax is predefined
const randomVariable = " Chai aur Code"
const reactElement = React.createElement(
  'a',//tagname
  {href: "https://google.com", target : "_blank"},//tag-attributes
  "Hello World", //text
  randomVariable //variable injection inside .createElement()
)
ReactDOM.createRoot(document.getElementById('root')).render(
    reactElement
)
//createRoot lets you create a root to display React components inside a browser DOM node.
```

**Hooks Introduction**

Helps with UI updation
We use the function useState to update variables all across DOM

```javascript
function App(){
    let [counter,setCounter] = useState(15) // useState takes parameter which would be the initial value of the varible, returns an array where first element is the main variable and second is a function which helps updating the variable

    const addValue = () => {
        console.log("clicked",counter);
        setCounter(counter+1)
    }
    return(
        <>
            <h1> Chai aur react </h1>
            <h3> Counter Value : {counter} </h3>
            <button onClick={addValue}> 
            Add Value {counter} 
            </button>
        </>
    )
}
```
&rarr; setCounter used here also accepts callbacks, which can be used to fetch previous 'counter' state
```javascript
  const addValue = () => {
        console.log("clicked",counter);
        setCounter(counter+1)
        setCounter(counter+1)
        setCounter(counter+1)
    }
```
Here the state would only be updated once, as fibre's diffing algo works in batches, thus value of counter is only incremented by 1

To achieve desired result we may use callback of setCounter
```javascript
const addValue = () => {
  setCounter(prevCounter => prevCounter+1)
  setCounter(prevCounter => prevCounter+1)
  setCounter(prevCounter => prevCounter+1)
}
```
Now this would increment the value of counter by 3
### Virtual DOM
Read article on github (react-fibre-architecture), important as per interview perspective.
[Article](https://github.com/acdlite/react-fiber-architecture)

### Props in React
We can pass on properties which would be reflected in UI
```javascript
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
```

## useState in React
&rarr; It is used to propagate the UI changes on a web page
&rarr; Returns an array with first element the variable itself and second a function which updates the variable

```javascript
  let [counter,setCounter] = useState(15)

  const addValue = () => {
    if(counter < 20)
    setCounter(counter+1)
  }

  const removeValue = () => {
    if(counter > 0) 
    setCounter(counter - 1)
  }
```
In this example the initial value of counter is set to 15 and is updated through addValue and removeValue

## useCallback in React
Call useCallback at the top level of your component to cache/memorise a function definition between re-renders:

```javascript
const passwordGenerator = useCallback(fn,dependencies);
```
dependencies &rarr; is an array of elements on which the given fn is dependent
whenever dependencies are triggered, the fn is called

(Read [documentation](https://react.dev/reference/react/useCallback) also)

## useEffect in React
In 5th project, when the page loads for the first time the password field was empty, thus we wanted to run the passwordGenerator function automatically, for which we use the useEffect hook

```javascript
useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
```
Read [documentation](https://react.dev/reference/react/useEffect) for useEffect
## Copying to clipboard
For this we use window object, since react code is rendered on client side, thus we get this window object (window object is not available in NextJS)
```javascript
const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])
```

## useRef in React
After the password is copied to notify user about the change we may highlight the copied password, to do that we use useRef, useRef hook provides a reference
```javascript
const passwordRef = useRef(null)

const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])
```
Read [documentation](https://react.dev/reference/react/useRef) for useRef

## useId in React
Generates a unique value
```javascript
const amountInputId = useId()
```
read about onChange and htmlFor attributes

## React Router
Here we learn to use a third party library &rarr; React Router DOM

### Installation
```bash 
npm install react-router-dom
```
### Usage in project 7
We are using Link and NavLink tags, which are provided by react-router-dom library

Link tag &rarr; used in place of anchor tag because anchor tag requires refreshing of the page whereas Link doesn't require such thing

NavLink tag -> provides access to 2 useful variables (isActive, isPending), CSS classes are written as callbacks, and the above variables can be used to conditionally use CSS

```html
<NavLink
className={({isActive}) =>
`block py-2 pr-4 pl-3 duration-200 
${isActive ? "text-orange-700" : "text-gray-700"} 
border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
}
>
Home
</NavLink>
```
### React Routing
Now to go to different routes we use the following syntax
```javascript
const router = createBrowserRouter([
  {
    path : "/",
    element : <Layout/>,
    children : [
      {
        path : "",
        element : <Home/>
      },
      {
        path : "about",
        element : <About/>
      },
      {
        path : "contact",
        element : <Contact/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
```
One more syntax method can be
```javascript
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='user/:userid' element={<User />} />
      <Route 
      loader={githubInfoLoader}
      path='github' 
      element={<Github />}
       />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
```
### API Handling using react 
&rarr; 1st Method
```javascript
import React, { useEffect, useState } from 'react'

function Github() {
    const [data, setData] = useState([])
    useEffect(() => {
     fetch('https://api.github.com/users/hiteshchoudhary')
     .then(response => response.json())
     .then(data => {
        console.log(data);
        setData(data)
     })
    }, [])
    
  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>Github followers: {data.followers}
    <img src={data.avatar_url} alt="Git picture" width={300} />
    </div>
  )
}
```
&rarr; 2nd Method
```javascript
import { useLoaderData } from 'react-router-dom'

function Github() {
    const data = useLoaderData()
 return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>Github followers: {data.followers}
    <img src={data.avatar_url} alt="Git picture" width={300} />
    </div>
  )
}

export default Github

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/hiteshchoudhary')
    return response.json()
}
```
### Learning about Loader
**Read [Documentation](https://reactrouter.com/en/main/route/loader#loader)**

Also loader helps optimising the loading of the page, because when we hover our mouse, it executes the API calls thus prevents lag

```javascript
//Github.jsx
export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/hiteshchoudhary')
    return response.json()
}

//main.jsx (inside react router components)
<Route 
      loader={githubInfoLoader}
      path='github' 
      element={<Github />}
       />
    </Route>
```
## Context API
Context provides a way to pass data through the component tree without having to pass props down manually at every level.

Library used &rarr; react-redux / redux toolkit

Q. Why don't we use a global file to store global variables ?

### Creating Context for user
```javascript
import React from 'react'
const UserContext = React.createContext()
export default UserContext;
```
We normally wrap our code with this UserContext so that it becomes accesible to every component.

Something like this &rarr;
```html
<UserContext>
<Login/>
<Card>
  <Data/>
</Card>
</UserContext>
```
Now providing a context provider
```javascript
import React from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) => {
    const [user,setUser] = React.useState(null)
    return(
        <UserContext.Provider value={{user,setUser}}>
        {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
```
Now the children have access to user and setUser 
(In this project, login and profile has the access)

### Login 
```javascript
import React, {useState, useContext} from 'react'
import UserContext from '../context/UserContext'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {setUser} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        setUser({username, password})
    }
  return (
    <div>
        <h2>Login</h2>
        <input type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value) }
        placeholder='username'  />
        {" "}
        <input type='text' 
        value={password}
        onChange={(e) => setPassword(e.target.value) }
        placeholder='password'  />
        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Login
```
### Profile
```javascript
import React, {useContext} from 'react'
import UserContext from '../context/UserContext'

function Profile() {
    const {user} = useContext(UserContext)
    
    if (!user) return <div>please login</div>

    return <div>Welcome {user.username}</div>
}

export default Profile
```
## Theme Switcher

&rarr; For theme switching we first need to enable it in tailwind config

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Another way to write context files
&rarr; Exporting ThemeContextProvider and Context from the same file

```javascript
import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  themeMode: "light",
  darkTheme: () => {},
  lightTheme: () => {},
});

export const ThemeProvider = ThemeContext.Provider;

export default function useTheme() {
  return useContext(ThemeContext);
}
```

Wrapping Context Provider in App.jsx
```javascript
function App() {
  const [themeMode, setThemeMode] = useState("light")
  //Also writing the functions for light and dark theme
  const lightTheme = () => {
    setThemeMode("light")
  }

  const darkTheme = () => {
    setThemeMode("dark")
  }

  // actual change in theme

  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])
  

  return (
    <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
      <div className="flex flex-wrap min-h-screen items-center">
          <div className="w-full">
              <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                  <ThemeBtn />
              </div>

              <div className="w-full max-w-sm mx-auto">
                  <Card />
              </div>
          </div>
      </div>
    </ThemeProvider>
  )
}
export default App
```

## React Redux

Redux is an independent state management library

react-redux acts as a bridge between react and redux

### Concept of Store 

&rarr; Acts as a single source of truth (somewhat like global variable)

### Concept of Reducers
&rarr; Anything we want to change in store, it is done by reducers (they are javascript objects)

#### Methods 
&rarr; useSelector : When we need to select value from store

&rarr; useDispatch : When we need to set value inside store

Now we need to install redux toolkit and react-redux to work

```bash
npm install @reactjs/toolkit
npm install react-redux
```
### Now there are certains steps to set up the environment

&rarr; Create store.js in src/app 

```javascript
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";
export const store = configureStore({
  reducer: todoReducer,
});
```

&rarr; Create todoSlice.js in src/features/todo

```javascript
import { createSlice, nanoid } from "@reduxjs/toolkit";
// nanoid generates unique id's
// Now we need to set the initial state of the store, it can be an array or an object
const initialState = {
  todos: [{ id: 1, text: "Hello World" }],
};

//In context API's we used to declare the function but never define, but in react-redux we declare as well as define the function here itself

//createSlice takes objects, and follow the syntax carefully

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    //We get state and action here, state provides the current state, action provides us different values of the state 
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});
// Individual functions are exported as it will be used in  different components
export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
```

### AddTodo components

Here we will use dispatch

useDispatch uses reducers to change values in store

```javascript
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {addTodo} from '../features/todo/todoSlice' 

function AddTodo() {

    const [input, setInput] = useState('')
    const dispatch = useDispatch()

    const addTodoHandler = (e) => {
        e.preventDefault()
        dispatch(addTodo(input))
        setInput('')
    }

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Add Todo
      </button>
    </form>
  )
}
export default AddTodo
```
### Todos.jsx component

Here we use 'useSelector' to retrive data and provides callback access to state

```javascript
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {removeTodo} from '../features/todo/todoSlice'

function Todos() {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()

  return (
    <>
    <div>Todos</div>
    <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            <div className='text-white'>{todo.text}</div>
            <button
             onClick={() => dispatch(removeTodo(todo.id))}
              className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Todos
```
&rarr; In context API's we used to wrap the HTML in App.jsx using provider,but here we can also wrap it in main.jsx

#### Main.jsx
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
```
#### App.jsx
```javascript
import './App.css'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {
  return (
    <>
      <h1>Learn about redux toolkit</h1>
      <AddTodo/>
      <Todos/>
    </>
  )
}
export default App
```

## Full react project (Mega Blog)

### Setting up env varibles 

Using appwrite as a backend service

### creating conf.js file
&rarr; sometimes writing ```import.meta.env.VITE_APPWRITE_URL``` may not load the env variables correctly, hence the whole code wouldn't work, thus we create conf.js and export many key-value variables
(**Production Grade Approach**)




