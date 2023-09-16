import { createSlice } from '@reduxjs/toolkit';

const initialState={
    isSignedIn:false,
    name:"",
    email:"",
}

// Create a slice for the user state
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,

  reducers: {
    signIn:(state, action)=> {
      const temp={
        isSignedIn: true,
        ...action.payload
      }
      localStorage.setItem('user',JSON.stringify(temp));
      window.location.replace("/home")
      return temp
      },
    loadUser:(state,action)=>{
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if(storedUser){
        return storedUser;
      }
      else{
        return {}
      } 
    },
    // Reducer to handle the SIGN_OUT action
    signOut:(state)=> {
      return {
         name:"",
         email:"",
        ...state,
      };
    },
    loggingOut:(state)=>{
      localStorage.removeItem("user");
      return {
        ...initialState
      }
    }
}});

export default userSlice.reducer
export const {signIn,signOut,loadUser,loggingOut}=userSlice.actions

// const loadUserState = () => {
//   const userStateStr = localStorage.getItem('userState');
//   if (userStateStr) {
//     return JSON.parse(userStateStr);
//   } else {
//     return {};
//   }
// };

// // Create a function to save the user state to local storage
// const saveUserState = (userState) => {
//   localStorage.setItem('userState', JSON.stringify(userState));
// };


