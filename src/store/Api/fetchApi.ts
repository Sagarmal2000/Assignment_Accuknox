import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Widget } from "../../Types/type";

const categoryApi=createApi({
    reducerPath:"category",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:3001"
    }),
    endpoints:(builder)=>({
        fetchCategoryApi:builder.query<any, void>({
            query:()=>{
                return{
                    url:"/categories",
                    method:'GET'
                };
            },
        }), 
        deleteWidget:builder.mutation({
            query:({selectedId,updatedWidget}:{selectedId:number,updatedWidget:Widget[]})=>{
                return {
                    url:`/categories/${selectedId}`,
                    method:'PATCH',
                    body:{widgets:updatedWidget}
                }
            }
        }),
        addWidget:builder.mutation({
            query:({selectedId,updatedWidget}:{selectedId:number,updatedWidget:Widget[]})=>{
                return{
                    url:`/categories/${selectedId}`,
                    method:'PATCH',
                    body:{widgets:updatedWidget}
                }
            }
        })       
        
    }),
    }
)

export const {useFetchCategoryApiQuery,useDeleteWidgetMutation,useAddWidgetMutation}=categoryApi
export {categoryApi}