'use client';
import { RootState } from '@/lib/store'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    render: false,
}

export const renderNotification = createSlice({
  name: 'renderNotification',
  initialState,
  reducers: {
    addNotication:(state , action) => {
      return {
        render: action.payload
      }
    },
    
  },
})
export const { addNotication } = renderNotification.actions

export const selectNotification = (state: RootState) => state.notifitcation

export default renderNotification;