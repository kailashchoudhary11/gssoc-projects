import UserContext from "./theme";
import { useState } from "react";

const UserContextProvider = ({ children }) => {
        const [user,setUser] = useState(null);
    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
