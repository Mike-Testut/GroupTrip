import {Route, Routes, Navigate} from 'react-router-dom';
import {useAuth} from "@/lib/auth.tsx";
import type {ReactNode} from "react";

import LandingPage from "./pages/LandingPage.tsx";
import Login from "@/pages/Login.tsx";



const PrivateRoute = ({children}: {children: ReactNode}) => {
    const {user, isLoading} = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-5 h-5 rounded-full border-2 border-coral border-t-transparent animate-spin" />
            </div>
        )
    }
    return user ? <>{children}</> : <Navigate to="/login" replace />
}

const App = () => {

  return (
    <Routes>
    {/*  Public Routes*/}
        <Route path="/" element = {<LandingPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login isSignup />}/>

    </Routes>
  )
}

export default App
