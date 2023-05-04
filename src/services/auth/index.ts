import { createApi } from '@reduxjs/toolkit/query/react'

import { I_SignInDto } from './models/dtos'
import { T_AuthResponse } from './models/responses'

import { baseQueryWithReAuth } from 'services/utils'

export const authAPI = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: (build) => ({
    signIn: build.mutation<T_AuthResponse, I_SignInDto>({
      query: (payload) => ({
        url: 'auth/signin',
        method: 'POST',
        body: payload,
      }),
    }),
    check: build.query<T_AuthResponse, void>({
      query: () => ({
        url: `auth/check`,
      }),
    }),
  }),
})
