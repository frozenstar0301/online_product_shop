import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction  } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { User } from "../../app/models/user";

interface UserState {
    username: string;
    password: string;
    status: string;
    error: string | null;
}

const initialState: UserState = {
    username: '',
    password: '',
    status: 'idle',
    error: null
}

const productsAdapter = createEntityAdapter<User>();

export const addUser = createAsyncThunk<User, { username: string, password: string }>(
    'user/addUser',
    async ({ username, password }, thunkAPI) => {
        try {
            return await agent.User.addUser(username, password);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const loginUser = createAsyncThunk<User, { username: string, password: string }>(
    'user/loginUser',
    async ({ username, password }, thunkAPI) => {
        try {
            return await agent.User.loginUser(username, password);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const changePwd = createAsyncThunk<User, { username: string, password: string }>(
    'user/changePwd',
    async ({ username, password }, thunkAPI) => {
        try {
            return await agent.User.changePwd(username, password);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const checkUser = createAsyncThunk<User, { username: string }>(
    'user/checkUser',
    async ({ username }, thunkAPI) => {
        try {
            return await agent.User.checkUser(username);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const userSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState<UserState>({
        username: '',
        password: '',
        status: 'idle',
        error: null
    }),
    reducers: {
        resetStatus: (state) => {  // Add this code
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addUser.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(addUser.fulfilled, (state, action:PayloadAction<User>) => {
            state.status = 'succeeded';
            // Add any fetched user to the state
            
            state.username = action.payload.username;
            state.password = action.payload.password;
        });
        builder.addCase(addUser.rejected, (state, action) => {
            state.status = 'failed';
        });

        builder.addCase(loginUser.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(loginUser.fulfilled, (state, action:PayloadAction<User>) => {
            state.status = 'succeeded';
            // Add any fetched user to the state
            localStorage.loginstatus = "true";
            localStorage.username = action.payload.username;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.status = 'failed';
        });

        builder.addCase(checkUser.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(checkUser.fulfilled, (state, action:PayloadAction<User>) => {
            state.status = 'check_succeeded';
            // Add any fetched user to the state
            localStorage.changePwdStatus = 'true';
            state.username = action.payload.username;
        });
        builder.addCase(checkUser.rejected, (state, action) => {
            state.status = 'failed';
        });

        builder.addCase(changePwd.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(changePwd.fulfilled, (state, action:PayloadAction<User>) => {
            state.status = 'succeeded';
            // Add any fetched user to the state
            localStorage.changePwdStatus = 'false';
        });
        builder.addCase(changePwd.rejected, (state, action) => {
            state.status = 'failed';
        });
    },
})

export const { resetStatus } = userSlice.actions;