import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState ={
    checkedProjects:[],
    searchText:''
}

const filterSlice = createSlice({
    name:'filters',
    initialState,
    reducers:{
        filterTasks: (state,action)=>{
            state ={...state, ...action.payload}
            return state
        }
    }
})

export default filterSlice.reducer
export const {filterTasks} = filterSlice.actions