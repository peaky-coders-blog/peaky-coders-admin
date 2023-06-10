export interface I_Reaction {
  id: number
  name: string
  icon: string
  createdAt: Date
  updatedAt: Date
}

export interface I_ArticleReaction {
  id: number
  counter: number
  reactionId: number
  articleId: number
  createdAt: Date
  updatedAt: Date
  reaction?: I_Reaction
}
