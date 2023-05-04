export const formatToDataSource = <T extends { id: number }>(data: T[]) =>
  data.map((item) => ({ ...item, key: String(item.id) }))
