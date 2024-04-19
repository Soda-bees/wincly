import { createSlice } from '@reduxjs/toolkit';
const showTutorialSlice = createSlice({
    name: 'showTutorial',
    initialState: {
        showTutorial: true,
    },
    reducers: {
        setShowTutorialTrue: (state) => {
            state.showTutorial = true;
        },
        setShowTutorialFalse: state => {
            console.log("show tutorial redux");
            state.showTutorial = false;
        },
    },
});
export const { setShowTutorialTrue, setShowTutorialFalse } = showTutorialSlice.actions;
export const selectShowTutorial = state => state.tutorial.showTutorial;
export default showTutorialSlice.reducer;
