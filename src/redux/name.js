import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        message: "I am new"
    },
    reducers: {
        setMessage(state, action) {
            state.message = action.payload;
        }
    }
});


export const { setMessage } = messageSlice.actions;
export default messageSlice.reducer;
