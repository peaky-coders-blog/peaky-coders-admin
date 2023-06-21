import { createApi } from '@reduxjs/toolkit/query/react'

import { T_CreateTagDto } from './models/dtos'
import { T_GetTagsResponse, T_CreateTagResponse } from './models/responses'

import { baseQueryWithReAuth } from '../utils'

export const tagsAPI = createApi({
  reducerPath: 'tagsAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['tags', 'tag'],
  endpoints: (build) => ({
    getTags: build.query<T_GetTagsResponse, null>({
      query: () => ({
        url: '/tags',
      }),
      providesTags: ['tags'],
    }),

    createTag: build.mutation<T_CreateTagResponse, T_CreateTagDto>({
      query: (payload) => ({
        url: `/tags`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['tags'],
    }),
  }),
})
