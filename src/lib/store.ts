import uploadAvatar from '@/lib/features/Avatar/Avatar'
import renderNotification from '@/lib/features/Notification/NotificationSlice'
import addRemoveProduct  from '@/lib/features/ShoppingCart/ShoppingCartSlice'
import { configureStore } from '@reduxjs/toolkit'

export const makeStore = () => {
  return configureStore({
    reducer: {
      product: addRemoveProduct.reducer,
      notifitcation: renderNotification.reducer,
      avatar: uploadAvatar.reducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']