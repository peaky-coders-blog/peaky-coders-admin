import { I_Article } from 'models/article'
import { T_UpdateArticleForm } from 'models/article/forms'

export const articleToFormUpdate = (article: I_Article): T_UpdateArticleForm => {
  return {
    title: article.title,
    content: article.content,
    status: article.status,
    tags: article.tags?.map((tag) => tag.id) || [],
  }
}
