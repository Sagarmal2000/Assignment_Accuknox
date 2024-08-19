import { Outlet } from "react-router-dom"
import Header from "./components/header"



function Root(){
    return <div className="flex flex-col">
        <div className="font-bold"><Header /></div>
        <div className="min-h-screen bg-blue-100"><Outlet /></div>
    </div>
}

export default Root