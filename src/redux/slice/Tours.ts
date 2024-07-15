
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import API from '../../axios';

export const FetchToursGet = createAsyncThunk(
    "tours/FetchToursGet",
    async (_, { rejectWithValue }) => {
        try {
            const respons = await API.get("api/v1/tours/")
            return respons.data
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    }
)

interface IinitialState {
    data: null | any,
    loading: boolean,
    error: string
}

const initialState: IinitialState = {
    data: null,
    loading: false,
    error: ""
}

const tours_slice = createSlice({
    name: "tours",
    initialState: initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(FetchToursGet.pending, state => {
                state.loading = true
            })
            .addCase(FetchToursGet.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
    }
})

export const { } = tours_slice.actions
export default tours_slice.reducer

