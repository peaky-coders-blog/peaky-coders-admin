import { createApi } from '@reduxjs/toolkit/query/react'

import { T_CreateTagDto, T_UpdateTagDto } from './models/dtos'
import {
  T_GetTagsResponse,
  T_CreateTagResponse,
  T_GetTagResponse,
  T_UpdateTagResponse,
} from './models/responses'

import { baseQueryWithReAuth } from '../utils'

import { T_TagId } from 'models/tags'

export const tagsAPI = createApi({
  reducerPath: 'tagsAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['tags', 'tag'],
  endpoints: (build) => ({
    getTags: build.query<T_GetTagsResponse, null | void>({
      query: () => ({
        url: '/tags',
      }),
      providesTags: ['tags', 'tag'],
    }),

    getTag: build.query<T_GetTagResponse, T_TagId>({
      query: (payload) => ({
        url: '/tags/' + payload,
      }),
      providesTags: ['tag'],
    }),

    createTag: build.mutation<T_CreateTagResponse, T_CreateTagDto>({
      query: (payload) => ({
        url: `/tags`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['tags'],
    }),

    deleteTag: build.mutation<void, T_TagId>({
      query: (payload) => ({
        url: `/tags/${payload}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['tags'],
    }),

    updateTag: build.mutation<T_UpdateTagResponse, { body: T_UpdateTagDto; tagId: T_TagId }>({
      query: (payload) => ({
        url: `/tags/${payload.tagId}`,
        method: 'PUT',
        body: payload.body,
      }),
      invalidatesTags: ['tags', 'tag'],
    }),
  }),
})
