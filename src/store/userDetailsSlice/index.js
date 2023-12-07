import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userDetalis: "",
};

const UserDetalisSlice = createSlice({
  name: 'userDetalis',
  initialState,
  reducers: {
    handleAddUserDetails(state, action) {
      state.userDetalis = action.payload;
    },
    handleRemoveUserDetails(state) {
      state.userDetalis = '';
    },
  },
});

export const {handleAddUserDetails, handleRemoveUserDetails} = UserDetalisSlice.actions;

export default UserDetalisSlice.reducer;
