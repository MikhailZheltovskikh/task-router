import React from "react"
import { useAuth } from "../../context/AuthProvider"
import { Navigate, useLocation } from "react-router-dom"

type IPrivateRouteProps = {
	children: React.ReactNode
}
export const PrivateRoute: React.FC<IPrivateRouteProps> = ({children}) =>{
	const auth = useAuth()
	const location = useLocation()

	if(auth.user === null && !auth.isLogout){
		return <Navigate to={'/login'} state={{from: location.pathname}} replace/>
	}

	return children
}