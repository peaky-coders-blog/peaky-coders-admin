import { I_Response } from 'models/shared/app'
import { I_Tag } from 'models/tags'

export type T_CreateTagResponse = I_Response

export type T_GetTagsResponse = I_Response<I_Tag[]>
