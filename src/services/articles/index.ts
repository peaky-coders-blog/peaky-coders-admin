import { createApi } from '@reduxjs/toolkit/query/react'

import { T_GetArticlesDto } from './models/dtos'
import { T_GetArticlesResponse, T_GetArticleResponse } from './models/responses'

import { baseQueryWithReAuth } from '../utils'

import { T_AdminId } from 'models/shared/admin'

export const articlesAPI = createApi({
  reducerPath: 'articlesAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['articles', 'article'],
  endpoints: (build) => ({
    getArticles: build.query<T_GetArticlesResponse, T_GetArticlesDto>({
      query: (payload) => ({
        url: '/articles',
        params: payload,
      }),
      providesTags: ['articles'],
    }),

    getAdmin: build.query<T_GetArticleResponse, T_AdminId>({
      query: (payload) => ({
        url: `/articles/${payload}`,
      }),
      providesTags: ['articles', 'article'],
    }),
  }),
})
