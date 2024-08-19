import {setSearchTerm} from '../store'
import { useDispatch,useSelector } from "react-redux"
import { TextField } from '@mui/material'


function Search(){
    const dispatch=useDispatch()
    const{searchTerm}=useSelector((state:any)=>state.AllState)
    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setSearchTerm(e.target.value))

    }
    return <TextField
    value={searchTerm}
    onChange={handleChange}
    variant="outlined"
    placeholder="Search..." 
    />

}

export default Search