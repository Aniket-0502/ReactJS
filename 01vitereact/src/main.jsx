import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


//App is just another function, so if we create a similar function, it would be executed
// For creating react elements we use.createElement i/p as object, and that object syntax is predefined
const randomVarible = " Chai aur code"
const reactElement = React.createElement(
  'a',//tagname
  {href: "https://google.com", target : "_blank"},//tag-attributes
  "Hello World", //text
  randomVarible
)

ReactDOM.createRoot(document.getElementById('root')).render(
    reactElement
)

//createRoot lets you create a root to display React components inside a browser DOM node. In this case it displays the App.jsx component
// While creating components always keep the first letter capital and also remember that one component can export only one HTML component




