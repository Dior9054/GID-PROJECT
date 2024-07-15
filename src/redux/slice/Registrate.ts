
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import API from "../../axios"

export const FetchRegistration = createAsyncThunk(
    "registrate/FetchRegistration",
    async (payload: any, { rejectWithValue }) => {
        try {
            const respons = await API.post("api/v1/accounts/register/", payload)
            return respons.data
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const FetchForgotPassword = createAsyncThunk(
    'registrate/FetchForgotPassword',
    async (payload: any, { rejectWithValue }) => {
        try {
            const respons = await API.post(`api/v1/accounts/reset-password/get-code/${payload.code}`)
            // const respons = await API.post(`api/v1/accounts/reset-password/${payload.code}`)
            return { data: respons.data, Change: payload.Change }
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const FetchCheckPassword = createAsyncThunk(
    "registrate/FetchCheckPassword",
    async (payload: any, { rejectWithValue }) => {
        try {
            let { code, Change } = payload
            const respons = await API.post(`api/v1/accounts/reset-password/chek-code/${code}`)
            return { data: respons.data, Change, code }
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    }
)

interface Ifuck {
    data: null | any,
    loading: boolean,
    error: null | {} | any
}

const fuck: Ifuck = {
    data: null,
    loading: false,
    error: {}
}

const regist_slice = createSlice({
    name: "regist",
    initialState: fuck,
    reducers: {
        clearRegistrationError(state) {
            state.error = {}
        }
    },
    extraReducers(builder) {
        builder
            .addCase(FetchRegistration.pending, state => {
                state.loading = true
            })
            .addCase(FetchRegistration.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = null
                localStorage.setItem("token", action.payload?.token)
            })
            .addCase(FetchRegistration.rejected, (state, action: any) => {
                state.loading = false
                const message: any = Object.entries(action.payload).flat()
                state.error = { [message[0]]: message[1][0] }
            })

            .addCase(FetchForgotPassword.fulfilled, (state, action) => {
                action.payload.Change(7)
            })
            .addCase(FetchForgotPassword.rejected, (state, action: any) => {
                state.error = "Такой пользователь не нейден"
            })

            .addCase(FetchCheckPassword.fulfilled, (state, action) => {
                localStorage.setItem("code", JSON.stringify(action.payload?.code))
                action.payload.Change(8)
            })
            .addCase(FetchCheckPassword.rejected, (state, action: any) => {
                state.error = action.payload?.detail
            })
    }
})

export const { clearRegistrationError } = regist_slice.actions
export default regist_slice.reducer

