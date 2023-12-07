import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    eventJoiningReqData:[]
}

const eventJoiningReqDataSlice = createSlice({
    name:"eventJoiningReqData",
    initialState,
    reducers: {
        handleAddData(state , action) {
            state.eventJoiningReqData.push(action.payload);
        },
        handleRemoveData(state , action) {
            state.eventJoiningReqData = []
        },
    },
});

export const {  handleAddData , handleRemoveData } = eventJoiningReqDataSlice.actions

export default eventJoiningReqDataSlice.reducer