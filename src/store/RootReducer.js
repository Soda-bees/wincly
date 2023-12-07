import { combineReducers } from "@reduxjs/toolkit";
import isSignedInSlice from "./isSignedInSlice";
import userDetailsSlice from "./userDetailsSlice"
import eventJoiningReqDataSlice from "./eventsJoiningRequest";


const rootReducer = combineReducers({
    isSignedInSlice,
    userDetailsSlice,
    eventJoiningReqDataSlice
});

export default rootReducer;