import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

function Header(){
    const location=useLocation()
    return <div className="flex bg-slate-300 gap-4 p-2">
    <Link to="/" 
    className={`${location.pathname==="/"?"text-blue-600":"text-black"}`}>Home</Link>
    <Link to="/dasboard"
    className={`${location.pathname==="/dasboard"?"text-blue-600":"text-black"}`}>Dasboard</Link>
    </div>
}
export default Header