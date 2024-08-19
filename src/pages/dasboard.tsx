
import { useFetchCategoryApiQuery} from "../store";
import type { Category} from "../Types/type";
import Modal from "../components/modal";
import DasboardHeader from "../components/dasboardHeader";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import RenderData from "../components/renderData";
import { setData } from "../store";
import Form from "../components/Form";


function Dasboard(){
    const dispatch=useDispatch()
    const {Data,isOpen,selectedId,isModalOpen,searchTerm}=useSelector((state:any)=>state.AllState)
    const{data,isLoading,error}=useFetchCategoryApiQuery()
    
    // fetch the data from json-server and set that data 
    useEffect(() => {
        if (data && Data.length === 0) {
            dispatch(setData(data));
            }
        }, [data, Data.length, dispatch]);

    if(isLoading){
        return <div>...loading</div>
    }
    if(error){
        return <div>something went wrong...</div>
    }

    // filter the data during Search
    const filterCategoryData=Data.map((cat:Category)=>{
        const filWid=cat.widgets.filter(wid=>wid.title.toLowerCase().includes(searchTerm.toLowerCase()))
        return {
            ...cat,widgets:filWid
        }
    }).filter((category:Category)=>searchTerm ? category.widgets.length > 0 : true)

    return <div>
        <DasboardHeader/>
        <RenderData Data={searchTerm?filterCategoryData:Data} 
        searchTerm={searchTerm}/>
        {isOpen&&<Form/>}
        {isModalOpen&&<Modal Data={Data} selectedId={selectedId}/>}
    </div>
}

export default Dasboard