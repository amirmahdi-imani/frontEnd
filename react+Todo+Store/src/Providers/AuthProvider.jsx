import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { supabase } from "../authApi";


const AuthProvider = ({children}) =>{

    const dispatch = useDispatch();

    useEffect(()=>{
        supabase.auth.getSession().then(({data:{session}})=>{
            if (session?.user){
                dispatch(loginSuccess(session.user))
            }
        });
    },[dispatch])
    return children
}

export default AuthProvider