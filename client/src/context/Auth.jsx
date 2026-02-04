import { createContext,useContext, useEffect, useState } from "react"
import axios from "axios"
const Auth = createContext()

const initialState = {isAuth : false, user : {}}
const AuthContext = ({children}) => {

    const [isAppLoading ,setIsAppLoading] = useState(true)
    const [state, setState] = useState(initialState)
    const readProfile = (token)=>{
        

        const jwt = token ||  localStorage.getItem("jwt")

        axios.get("http://localhost:8000/auth/user", {headers:{Authorization:`Bearer ${jwt}`}})
        .then((res)=>{
        const {status, data} = res
        if(status ===200){
          setState({isAuth:true, user:data.user})
        }
        })
        .catch(error=>{
          console.error(error)
        })
        .finally(()=>{

          setIsAppLoading(false)
        })

    }


    useEffect (() =>{
    readProfile()
    },[])
     const handleLogout = ()=>{
        setState(initialState)
        localStorage.removeItem("jwt")
     }
    return (
        //<Auth.Provider value ={{ isAuth: state.isAuth, user: state.user , isAppLoading}} >    another way to write ...state
    <Auth.Provider  value ={{...state , isAppLoading , handleLogout, dispatch: setState, readProfile}}>
      {children}
      
    </Auth.Provider>
  )
}

export default AuthContext

export const useAuth = ()=> useContext(Auth)
