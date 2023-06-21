import { I_Article } from 'models/article'
import { I_Response, T_Pagination } from 'models/shared/app'

export type T_GetArticlesResponse = I_Response<I_Article[], T_Pagination>

export type T_GetArticleResponse = I_Response<I_Article>

export type T_UpdateArticleResponse = I_Response
