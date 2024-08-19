import { RxCross2 } from "react-icons/rx";
import {Box,Typography } from "@mui/material"
import type { WidgetBoxProp } from "../Types/type";


function WidgetBox({title,text,handleDeleteClick,Cid,Wid,searchTerm}:WidgetBoxProp){
    return <Box  className={`w-96 h-64 rounded-md flex justify-between m-2 
            bg-white ${searchTerm && "bg-green-500"}`}>

            <Box>
                <Typography variant="h5" component="h3" style={{ fontSize: '20px' }} >
                    {title}
                </Typography>
                <Typography component="p">
                  {text}
                </Typography>
            </Box>

            <Box >
            <RxCross2 className="bg-gray-200 hover:bg-blue-600 cursor-pointer
             rounded-full size-6" 
            onClick={()=>handleDeleteClick(Cid,Wid)}/>
            </Box>
            
          </Box>
}
export default WidgetBox