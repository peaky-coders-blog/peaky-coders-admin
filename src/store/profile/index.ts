import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { T_AuthResponse } from 'services/auth/models/responses'
import { LocalStorage } from 'utils/helpers/localStorage'

export interface I_Profile {
  isAuth: boolean
  email: string
}

const initialState: I_Profile = {
  isAuth: false,
  email: '',
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<T_AuthResponse>) => {
      if (action.payload.data) {
        state.isAuth = true
        state.email = action.payload.data.admin.email
        if (action.payload.data.accessToken)
          LocalStorage.setAccessToken(action.payload.data.accessToken)
        if (action.payload.data.refreshToken)
          LocalStorage.setRefreshToken(action.payload.data.refreshToken)
      }
    },
    logout: () => {
      LocalStorage.removeAccessToken()
      LocalStorage.removeRefreshToken()
      return initialState
    },
  },
})

export const profileActions = profileSlice.actions
