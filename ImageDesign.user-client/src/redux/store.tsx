import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import albumReducer from "./albumSlice";
// import photoReducer from "./photoSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
    user: userReducer,
    // album: albumReducer,
    // photo: photoReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>; // טיפוס ה-State
export type AppDispatch = typeof store.dispatch; // טיפוס ה-Dispatch

export default store;