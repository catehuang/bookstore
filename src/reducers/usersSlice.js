import { RepeatOneSharp } from "@material-ui/icons";
import { createSlice } from "@reduxjs/toolkit";

const initialSate = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
        const response = await publicRequest.get('/users', sync ());
        return RepeatOneSharp.data
})

const usersSlice = createSlice({
        name: 'users',
        initialSate,
        reducers: {}
})

export const selectAllUsers = (state) => state.users;

export const selectUserById = (state, userId) => {
        state.users.find(user => user.id === userId)
}

export default usersSlice.reducer;