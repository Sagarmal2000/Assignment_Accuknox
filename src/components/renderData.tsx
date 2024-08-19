import { useDispatch } from "react-redux";
import { useDeleteWidgetMutation } from "../store";
import {setData,setIsOpen,setSelectedId} from "../store";
import type { Category,Widget,RenderDataProp} from "../Types/type";
import WidgetBox from "./widgetBox";
import { Box,Typography,Button } from "@mui/material";

function RenderData({Data,searchTerm}:RenderDataProp){
    const dispatch=useDispatch()
    const [deleteWidget]=useDeleteWidgetMutation()

    // find the data and delete the data
    const handleDeleteClick=async(Cid:number,Wid:string)=>{
        const findCid=Data.find((cat:Category)=>cat.id==Cid)
        if (findCid){  
        const updatedWidget=findCid?.widgets.filter((wid:Widget)=>wid.id!==Wid)
        console.log(updatedWidget)
        await deleteWidget({selectedId:Cid,updatedWidget})
        dispatch(setData(Data.map((cat:Category)=>cat.id==Cid?{...cat,widgets:updatedWidget}:cat)))
        }
    }

    // select id and open modal
    const handleAddWidget=(Cid:number)=>{
        dispatch(setIsOpen(true))
        dispatch(setSelectedId(Cid))
    }
    
    // showing Data 
    return Data.map((cat:Category)=>{
        const widgetRender=cat.widgets.map((wid:Widget)=>{
        return  <WidgetBox searchTerm={searchTerm} handleDeleteClick={handleDeleteClick} 
        key={wid.id} title={wid.title} 
        text={wid.text} Cid={cat.id} Wid={wid.id}/>   
        })  
        return <div key={cat.id} className="flex flex-col gap-4">
                <div ><h1>{cat.category}</h1></div>
                    <div className="flex flex-wrap m-2 gap-2">
                        {widgetRender}
                    <Box className="w-96 h-64 flex m-2 bg-white" >
                <Typography component="div" className="w-full flex flex-col items-center justify-center">
                    <Button onClick={()=>handleAddWidget(cat.id)} variant="contained" 
                    color="primary" className="border-2"> 
                        +ADD Widget</Button>
                </Typography>
            </Box>
        </div>
    </div>
    })
}
export default RenderData