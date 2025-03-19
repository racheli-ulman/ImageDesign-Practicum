import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserLogin, User } from '../models/user'

const url = 'http://localhost:5083/api/Auth';

// Async thunk for logging in a user
export const loginUser = createAsyncThunk('user/login',
    async (userData: UserLogin, thunkAPI) => {
        try {
            console.log(userData);           
            const response = await axios.post<{ user: User, token: string }>(`${url}/login`, userData);
            const { user, token } = response.data;
            sessionStorage.setItem('token', token); 
            return user;
        } catch (e: any) {  
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// Async thunk for registering a user
export const registerUser = createAsyncThunk('user/register',
    async (userData: User, thunkAPI) => {
        try {
            const response = await axios.post<{ user: User, token: string }>(`${url}/register`, userData);
            const { user, token } = response.data;
            sessionStorage.setItem('token', token); // Save token to session storage
            return user;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState: { 
        user: {} as User, 
        loading: true, 
        msg: '' // הוסף את השדה msg
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload as User;
            state.loading = false;
            state.msg = ''; // נקה את המסר במקרה של הצלחה
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.msg = action.payload as string || "Login failed"; // עדכן את המסר במקרה של שגיאה
        })
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload as User;
            state.loading = false;
            state.msg = ''; // נקה את המסר במקרה של הצלחה
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.msg = action.payload as string || "Registration failed"; // עדכן את המסר במקרה של שגיאה
        })
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
        });
    }
});

export default userSlice.reducer;