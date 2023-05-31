import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserInitialState } from '@/types/user.types';
import { UserService } from '@/api/services/user.servcie';
import { destroyCookie } from 'nookies';

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ login, password }: { login: string; password: string }) => {
    const response = await UserService.login(login, password);
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({
    login,
    email,
    password,
  }: {
    login: string;
    email: string;
    password: string;
  }) => {
    const response = await UserService.register(login, email, password);
    return response.data;
  }
);

export const getUser = createAsyncThunk('user/get', async () => {
  const response = await UserService.get();
  return response.data;
});

const initialState: UserInitialState = {
  isLoading: true,
  auth: false,
  user: {
    login: '',
    email: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    logoutUser: (state) => {
      state.isLoading = false;
      state.auth = false;

      destroyCookie(null, 'accessToken');
      destroyCookie(null, 'refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action: any) => {
        state.isLoading = true;
        state.auth = false;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.auth = false;
      })
      .addCase(loginUser.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.auth = true;
        state.user = {
          login: action.payload!.login,
          email: action.payload!.email,
        };
      })
      .addCase(registerUser.pending, (state, action: any) => {
        state.isLoading = true;
        state.auth = false;
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.auth = false;
      })
      .addCase(registerUser.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.auth = true;
        state.user = {
          login: action.payload!.login,
          email: action.payload!.email,
        };
      })
      .addCase(getUser.pending, (state, action: any) => {
        state.isLoading = true;
        state.auth = false;
      })
      .addCase(getUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.auth = false;
      })
      .addCase(getUser.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.auth = true;
        state.user = {
          login: action.payload!.login,
          email: action.payload!.email,
        };
      });
  },
});

export const { setLoading, logoutUser } = userSlice.actions;
export default userSlice.reducer;
