
import { configureStore } from "@reduxjs/toolkit";
import RegistSlice from "./slice/Registrate"
import ToursSlice from "./slice/Tours"

const store: any = configureStore({
    reducer: {
        registration: RegistSlice,
        tours: ToursSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store

