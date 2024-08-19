import { Box,Typography,Button } from "@mui/material"
import { useEffect, useState } from "react";
import { setSelectedId, useDeleteWidgetMutation } from "../store";
import ReactDom from 'react-dom';
import { setIsModalOpen,setData} from "../store";
import { useDispatch } from "react-redux";
import type { ModalProp } from "../Types/type";



function Modal({Data,selectedId}:ModalProp){
    const dispatch=useDispatch()
    const [checkedWidgets, setCheckedWidgets] = useState<Record<string, boolean>>({});
    const[deleteWidget]=useDeleteWidgetMutation()

    useEffect(()=>{
        dispatch(setSelectedId(1))
        document.body.classList.add("overflow-hidden")
        return ()=>{
            document.body.classList.remove("overflow-hidden")
        }
    },[])
 
    // check or uncheck the box
    const handleCheckboxChange = (widgetId:string) => {
        setCheckedWidgets(prevState => ({
          ...prevState,
          [widgetId]: !prevState[widgetId]
        }));
      };
    
    // render the widget list which is selected by user
    const Cdata= Data.find(cat=>cat.id==selectedId);
    let content;
    if(Cdata?.widgets.length){
       content=Cdata?.widgets.map((widget)=>{
        return <div key={widget.id} className='border-2 rounded p-2 mb-2'>
        <input
               type="checkbox"
               id={widget.id}
               className="mr-2"
               checked={!checkedWidgets[widget.id]}
               onChange={() => handleCheckboxChange(widget.id)}
           />
   <label htmlFor={widget.id} className="text-lg font-semibold">
       {widget.title}</label>
   </div>
       })
    }
    else{
        content="No widgets"
    }
    
    // remove widget form category if user uncheck the box and click on confirm
    const handleConfirm =async () => {
        if(!checkedWidgets){
            dispatch(setIsModalOpen(false))
        }
        else{
        const updatedWidget=Data.find(cat=>cat.id==selectedId)?.widgets
        .filter(widget=>!checkedWidgets[widget.id])
    try {
        // Make an request to update the data on the server
        if(updatedWidget){
        await deleteWidget({selectedId,updatedWidget});
          // If the request is successful, update the local state
          dispatch(setData(Data.map(cat=>cat.id==selectedId?{...cat,widgets:updatedWidget}:cat)));
          setCheckedWidgets({});
          dispatch(setSelectedId(1));
          dispatch(setIsModalOpen(false))
        }
        
      } catch (error) {
        console.error('An error occurred while updating the data:', error);
      }

    }};

    // select the category
    const handleClick=(id:number)=>{
        dispatch(setSelectedId(id))
    }

    // render category short name
    const Category=Data.map((cat)=>{
        return <Typography key={cat.id} component="div" 
        onClick={()=>handleClick(cat.id)} 
        className={`hover:text-blue-500 cursor-pointer ${selectedId==cat.id && 'underline'}`} >
            {cat.category.split(" ")[0]}
        </Typography>
    })

    // create a portal for modal
    const modalContainer = document.querySelector('.modal-container');
    if (!modalContainer) {
    console.error("Modal container not found");
    return null; // Or render a fallback UI
    }

    return ReactDom.createPortal(
    <div>
        <div className="fixed inset-0 bg-gray-300 opacity-80" 
        onClick={()=>dispatch(setIsModalOpen(false))}></div>
        <div className="fixed h-screen top-0 right-0 bg-white w-96 border-2">
            <Box>
                <Typography component="h2" className="bg-blue-500 p-1">
                    Add Category
                </Typography>
                <Box className="flex gap-4 m-2 h-10 border-b-2 ">
                {Category}
                </Box>
            </Box>
            <div className="flex flex-col h-screen">
                {content}
                <div className="absolute bottom-0 right-2 mb-6 flex gap-2">
                <Button variant="outlined" onClick={()=>dispatch(setIsModalOpen(false))}>cancel</Button>
                <Button variant="contained" color="primary" onClick={handleConfirm}>Confirm</Button>
                </div>
            </div>
        </div>
    </div>,
    modalContainer
    )

}
export default Modal