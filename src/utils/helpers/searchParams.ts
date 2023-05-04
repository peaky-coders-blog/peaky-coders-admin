export const searchParamsToObject = (searchParams: URLSearchParams): Record<string, string> => {
  const currentParams: Record<string, string> = {}

  searchParams.forEach((value, key) => {
    currentParams[key] = value
  })

  return currentParams
}

export const searchParamsToString = (searchParams: Record<string, string>): string =>
  Object.entries(searchParams).reduce((acc, cur) => {
    if (cur[1]) {
      acc += `${cur[0]}=${cur[1]}`
    }
    return acc
  }, '')
