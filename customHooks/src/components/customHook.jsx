import { createContext,useContext } from "react";

const AppContext = createContext();

const AppProvider = ({children}) => {
    const userData = {
        name : "Aniket",
        age : 20
    }
    return <AppContext.Provider value={userData}>{children}</AppContext.Provider>
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext,AppProvider,useGlobalContext}



