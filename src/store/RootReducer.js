import { combineReducers } from "@reduxjs/toolkit";
import isSignedInSlice from "./isSignedInSlice";
import userDetailsSlice from "./userDetailsSlice"
import eventJoiningReqDataSlice from "./eventsJoiningRequest";
import showTutorial from "./showTutorial"


const rootReducer = combineReducers({
    isSignedInSlice,
    userDetailsSlice,
    eventJoiningReqDataSlice,
    tutorial:showTutorial
});

export default rootReducer;