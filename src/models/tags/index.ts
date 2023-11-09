export type T_TagId = number

export interface I_Tag {
  id: T_TagId
  name: string
  description: string
  icon: string
  createdAt: Date
  updatedAt: Date
}

export type T_TagRecord = I_Tag & {
  key: React.Key
}
