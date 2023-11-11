import { I_Tag } from '.'

export type T_TagForm = Pick<I_Tag, 'name'>

export type T_CreateTagForm = Pick<I_Tag, 'name' | 'icon' | 'description'>

export type T_CreateTagArticleForm = T_TagForm

export type T_UpdateTagForm = Pick<I_Tag, 'name' | 'icon' | 'description'>
