import { Box,Button,TextField } from "@mui/material";
import { Category } from "../Types/type";
import { useAddWidgetMutation } from "../store";
import { setData,setIsOpen,setFormData} from "../store";
import { useDispatch,useSelector } from "react-redux";
import ReactDom from 'react-dom';



function Form(){
    const dispatch=useDispatch()
    const [addWidget]=useAddWidgetMutation()
    const {Data,formData,selectedId}=useSelector((state:any)=>state.AllState)
    

    // get textfield data
    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setFormData({...formData,[e.target.name]:e.target.value}))
        
    }

    // add widget after submitting form
    const handleSubmit=async(e: React.FormEvent)=>{
        e.preventDefault()
        dispatch(setIsOpen(false))
        const findWid=Data.find((cat:Category)=>cat.id==selectedId)
        if(selectedId && findWid){
            const updatedWidget=[...findWid.widgets,{
                id:Math.floor(Math.random()*1000).toString(),
                title:formData.title,
                text:formData.text
            }]
            console.log(Data)
            dispatch(setData(Data.map((cat:Category)=>cat.id==selectedId?
            {...cat,widgets:updatedWidget}:cat)))
    
            await addWidget({selectedId,updatedWidget})
        }
        dispatch(setFormData({
            title:"",
            text:""
        }))
    }

    // create a form portal
    const formContainer=document.querySelector(".form-container")
    if (!formContainer) {
        console.error("form container not found");
        return null; // Or render a fallback UI
        }

    return ReactDom.createPortal( <div >
    <div className="fixed inset-0 bg-gray-400 opacity-80"
    onClick={()=>dispatch(setIsOpen(false))}></div>
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 rounded-md
    -translate-y-1/2 p-4 h-96 w-96 bg-white flex justify-center items-center">      
        <Box
            component="form" 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-2">
            <TextField
                label="Widget Title"
                variant="outlined"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required />

            <TextField
                label="Widget Data"
                variant="outlined"
                name="text"
                value={formData.text}
                onChange={handleChange}
                required/>

            <Button className="w-64" type="submit" variant="contained" 
            color="primary">Submit</Button>
            <Button className="w-64" variant="outlined" color="secondary" 
            onClick={()=>dispatch(setIsOpen(false))}>Cancel</Button>
        </Box>
        </div>
    </div>,
    formContainer
    )
   
    
}
export default Form