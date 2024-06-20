import './App.css'

function App() {
  // console.log(process.env.REACT_APP_APPWRITE_URL) -> used when we build react using create react-app, but in this case we are using vite, thus the process to get environment varibles is different
  console.log(import.meta.env.VITE_APPWRITE_URL);
  return (
    <>
      <h1>A blog app with appwrite</h1>
    </>
  )
}

export default App
