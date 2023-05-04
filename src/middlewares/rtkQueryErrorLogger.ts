import { isRejectedWithValue } from '@reduxjs/toolkit'
import { notification } from 'antd'

import type { Middleware } from '@reduxjs/toolkit'

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errorMessage = action.payload.data?.message.text
    if (errorMessage) {
      notification.error({ message: errorMessage })
    }
  }

  return next(action)
}
