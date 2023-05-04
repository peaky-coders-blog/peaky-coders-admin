import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReAuth } from '../utils'

export const filesAPI = createApi({
  reducerPath: 'filesAPI',
  baseQuery: baseQueryWithReAuth,
  endpoints: (build) => ({
    uploadFile: build.mutation<any, FormData>({
      query: (payload) => ({
        url: `/upload/image`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
})
