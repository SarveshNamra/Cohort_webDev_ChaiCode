import { useContext, createContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({children}){
    const [count, setCount] = useState();

    const addNotification = () => {
        setCount((prev) => prev + 1);
    }

    const resetNotification = () => {
        setCount(0);
    }

    return (
        <NotificationContext.Provider value={{count, addNotification, resetNotification}}>
            {children}
        </NotificationContext.Provider>
    )
}

// custom hooks
export function useNotification(){
    return useContext(NotificationContext)
}