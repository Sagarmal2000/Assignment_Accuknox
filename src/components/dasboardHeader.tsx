
import { Button } from "@mui/material"
import { LuRefreshCcw } from "react-icons/lu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaClock } from "react-icons/fa6";
import Search from "./searchWidget";
import { setIsModalOpen } from "../store";
import { useDispatch} from "react-redux";

function DasboardHeader(){
    const dispatch=useDispatch()
    const addCategory=()=>{
        dispatch(setIsModalOpen(true))
    }
    return <div className="flex h-14 items-center justify-between  overflow-hidden">
        <div className="m-2 text-xl font-bold"><h1>CNAPP dasboard</h1></div>
        <div className="flex gap-4 m-4">
        <Search/>
        <Button variant="contained" color="primary" onClick={addCategory}>+Add Category</Button>
        <Button variant="outlined" color="primary"><LuRefreshCcw /></Button>
        <Button variant="outlined" color="primary" ><HiOutlineDotsVertical/></Button>
        <Button variant="contained" color="primary"><FaClock/>|Last 2 days</Button>
        </div>
        
    </div>
}
export default DasboardHeader