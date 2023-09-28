import { createSlice } from '@reduxjs/toolkit';
import { fetchToken } from '../../actions/token';

export const tokenKey: string = 'uETlQIIOrmMfazeI1liA' as const;

export type TokenState = {
  [key: string]: string;
};

const initialTokenState: TokenState = {
  [tokenKey]: localStorage.getItem(tokenKey) || '',
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState: initialTokenState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchToken.fulfilled, (sliceState, action) => {
      localStorage.setItem(tokenKey, action.payload);
      sliceState[tokenKey] = action.payload;
    });
  },
});
