import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { E_Locale } from 'models/shared/app'
import { LocalStorage } from 'utils/helpers/localStorage'

interface I_InitialState {
  language: E_Locale
}

export const initialState: I_InitialState = {
  language: LocalStorage.getLanguage() || E_Locale.ru,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    switchLanguage: (state, action: PayloadAction<E_Locale>) => {
      LocalStorage.setLanguage(action.payload)
      state.language = action.payload
    },
  },
})

export const appActions = appSlice.actions
