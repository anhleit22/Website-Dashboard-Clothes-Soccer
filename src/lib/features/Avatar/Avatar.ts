'use client';
import { RootState } from '@/lib/store'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    render: '',
}

export const uploadAvatar = createSlice({
  name: 'uploadAvatar',
  initialState,
  reducers: {
    addAvatar:(state , action) => {
      return {
        render: action.payload
      }
    },
    
  },
})
export const { addAvatar } = uploadAvatar.actions

export const selectUploadAvatar = (state: RootState) => state.notifitcation

export default uploadAvatar;