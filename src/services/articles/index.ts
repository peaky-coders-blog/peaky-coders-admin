import { createApi } from '@reduxjs/toolkit/query/react'

import { T_GetArticlesDto, T_UpdateArticleDto } from './models/dtos'
import {
  T_GetArticlesResponse,
  T_GetArticleResponse,
  T_UpdateArticleResponse,
} from './models/responses'

import { baseQueryWithReAuth } from '../utils'

import { T_ArticleId } from 'models/article'

export const articlesAPI = createApi({
  reducerPath: 'articlesAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['articles', 'article'],
  endpoints: (build) => ({
    getArticles: build.query<T_GetArticlesResponse, T_GetArticlesDto>({
      query: (payload) => {
        // Добавление примитивных параметров
        const params = Object.entries(payload).reduce((acc, [key, value]) => {
          if (typeof value === 'string') {
            return { ...acc, [key]: value }
          }
          return acc
        }, {})

        /**
         * INFO: Так как RTK Query неправильно формирует массив параметров,
         * пришлось сделать костыль для преобразования массива в правильный формат
         */

        // Добавление массива для сортировки
        let sorts = ''
        if (Array.isArray(payload.sort) && payload.sort.length) {
          sorts = payload.sort.reduce((acc, cur, curIndex, arr) => {
            const endValue = curIndex === arr.length ? '' : '&'
            acc += `sort=${cur}${endValue}`
            return acc
          }, '')
        }

        // Добавление массива для фильтрации
        let filters = ''
        if (Array.isArray(payload.filter) && payload.filter.length) {
          filters = payload.filter.reduce(
            (acc, cur, curIndex, arr) => {
              const endValue = curIndex === arr.length ? '' : '&'
              acc += `filter=${cur}${endValue}`
              return acc
            },
            sorts ? '&' : '',
          )
        }

        let url = `articles`
        if (sorts || filters) url += '?'
        if (sorts) url += sorts
        if (filters) url += filters

        return {
          url,
          params,
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

    updateArticle: build.mutation<
      T_UpdateArticleResponse,
      { body: T_UpdateArticleDto; articleId: T_ArticleId }
    >({
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
  }),
})
