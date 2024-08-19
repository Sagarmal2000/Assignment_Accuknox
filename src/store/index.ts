import {configureStore} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {categoryApi} from './Api/fetchApi'
import { AllStateReducer } from "./slices/dataSlice";


export const store= configureStore({
    reducer:{
        AllState:AllStateReducer,
        [categoryApi.reducerPath]:categoryApi.reducer

    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat(categoryApi.middleware)
    }
})
setupListeners(store.dispatch)
export type cusDispatch= typeof store.dispatch
export * from './slices/dataSlice'
export {useFetchCategoryApiQuery,useDeleteWidgetMutation,useAddWidgetMutation} from './Api/fetchApi'