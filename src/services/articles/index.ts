import { createApi } from '@reduxjs/toolkit/query/react'

import { T_CreateArticleDto, T_GetArticlesDto, T_UpdateArticleDto } from './models/dtos'
import { T_GetArticlesResponse, T_GetArticleResponse } from './models/responses'

import { baseQueryWithReAuth } from '../utils'

import { T_ArticleId } from 'models/article'

export const articlesAPI = createApi({
  reducerPath: 'articlesAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['articles', 'article'],
  endpoints: (build) => ({
    getArticles: build.query<T_GetArticlesResponse, T_GetArticlesDto>({
      query: (payload) => {
        /**
         * INFO: Так как RTK Query неправильно формирует массив параметров,
         * пришлось сделать костыль для преобразования массива в правильный формат
         */

        const url = `articles?`
        const params = new URLSearchParams()

        if (typeof payload.page === 'string') {
          params.append('page', payload.page)
        }

        if (typeof payload.limit === 'string') {
          params.append('limit', payload.limit)
        }

        if (Array.isArray(payload.sort)) {
          payload.sort.forEach((item) => {
            params.append('sort', item)
          })
        }

        if (Array.isArray(payload.filter)) {
          payload.filter.forEach((item) => {
            params.append('filter', item)
          })
        }

        return {
          url: url + params.toString(),
        }
      },
      providesTags: ['articles'],
    }),

    getArticle: build.query<T_GetArticleResponse, T_ArticleId>({
      query: (payload) => ({
        url: `/articles/${payload}`,
      }),
      providesTags: ['articles', 'article'],
    }),

    createArticle: build.mutation<void, T_CreateArticleDto>({
      query: (payload) => ({
        url: `/articles`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['articles'],
    }),

    updateArticle: build.mutation<void, { body: T_UpdateArticleDto; articleId: T_ArticleId }>({
      query: (payload) => ({
        url: `/articles/${payload.articleId}`,
        method: 'PUT',
        body: payload.body,
      }),
      invalidatesTags: ['articles', 'article'],
    }),

    deleteArticle: build.mutation<void, T_ArticleId>({
      query: (payload) => ({
        url: `/articles/${payload}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['articles'],
    }),

    deleteArticleComment: build.mutation<void, T_ArticleId>({
      query: (payload) => ({
        url: `/comments/${payload}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['articles', 'article'],
    }),

    deleteArticleAuthorReaction: build.mutation<void, { authorId: number; reactionId: number }>({
      query: ({ authorId, reactionId }) => ({
        url: `/reactions/${reactionId}/${authorId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['articles', 'article'],
    }),
  }),
})
