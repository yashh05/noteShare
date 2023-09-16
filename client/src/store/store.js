import { configureStore } from '@reduxjs/toolkit';
import userReducer  from './slices/userSlice';
// import {reducers} from "./slices/userSlice"

// Create the store
const store = configureStore({
reducer:{
    user:userReducer
}
});

// Export the store
export default store;