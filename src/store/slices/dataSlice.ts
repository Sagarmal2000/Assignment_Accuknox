

import { createSlice } from "@reduxjs/toolkit";

const allStateSlice=createSlice({
    name:"AllState",
    initialState:{
        Data:[],
        isOpen:false,
        isModalOpen:false,
        selectedId:null,
        searchTerm:"",
        formData:{
            title:"",
            text:""
        }
    },
    reducers:{
        setData(state,action){
            state.Data=action.payload
        },
        setIsOpen(state,action){
            state.isOpen=action.payload
        },
        setSelectedId(state,action){
            state.selectedId=action.payload
        },
        setFormData(state,action){
            state.formData.title=action.payload.title
            state.formData.text=action.payload.text
        },
        setIsModalOpen(state,action){
            state.isModalOpen=action.payload
        },
        setSearchTerm(state,action){
            state.searchTerm=action.payload
        }
    
    }
})

export const AllStateReducer=allStateSlice.reducer
export const {setData,setIsOpen,setSelectedId,setFormData,
    setIsModalOpen,setSearchTerm}=allStateSlice.actions