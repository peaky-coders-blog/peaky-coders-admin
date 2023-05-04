import { createSlice } from '@reduxjs/toolkit'

interface I_InitialState {
  isOpen: boolean
  isCollapsed: boolean
}

const initialState: I_InitialState = {
  isOpen: false,
  isCollapsed: false,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: initialState,
  reducers: {
    openSidebar: (state) => {
      state.isOpen = true
    },
    closeSidebar: (state) => {
      state.isOpen = false
    },
    toggleSidebarCollapse: (state) => {
      state.isCollapsed = !state.isCollapsed
    },
  },
})

export const sidebarActions = sidebarSlice.actions
