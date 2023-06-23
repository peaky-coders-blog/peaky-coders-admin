import { createApi } from '@reduxjs/toolkit/query/react'

import { T_CreateUserDto, T_UpdateUserDto } from './models/dtos'
import {
  T_CreateUserResponse,
  T_GetUserResponse,
  T_GetUsersResponse,
  T_UpdateUserResponse,
} from './models/responses'

import { baseQueryWithReAuth } from '../utils'

import { T_UserId } from 'models/user'

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['users', 'user'],
  endpoints: (build) => ({
    getUsers: build.query<T_GetUsersResponse, null>({
      query: () => ({
        url: '/users',
      }),
      providesTags: ['users'],
    }),

    getUser: build.query<T_GetUserResponse, T_UserId>({
      query: (payload) => ({
        url: `/users/${payload}`,
      }),
      providesTags: ['users', 'user'],
    }),

    createUser: build.mutation<T_CreateUserResponse, T_CreateUserDto>({
      query: (payload) => ({
        url: `/users`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['users'],
    }),

    updateUser: build.mutation<T_UpdateUserResponse, { user: T_UpdateUserDto; userId: T_UserId }>({
      query: (payload) => ({
        url: `/users/${payload.userId}`,
        method: 'PUT',
        body: payload.user,
      }),
      invalidatesTags: ['users', 'user'],
    }),

    deleteUser: build.mutation<void, T_UserId>({
      query: (payload) => ({
        url: `/users/${payload}`,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['users'],
    }),
  }),
})
