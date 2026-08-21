import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AuthUser {
  id: string
  role: string
  name: string
  email: string
  username: string
}

interface AuthState {
  user: AuthUser | null
}

const initialState: AuthState = {
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload
    },

    clearUser: (state) => {
      state.user = null
    },
  },
})

export const {
  setUser,
  clearUser,
} = authSlice.actions

export default authSlice.reducer