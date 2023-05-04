import { message } from 'antd'

export const uploadImageExtraText = '(.png, .jpeg, .jpg, .webp)'
export const uploadImageAcceptFiles = '.png, .jpeg, .jpg, .webp'

export const normalizeImages = (e: any) => {
  if (Array.isArray(e.fileList) && e.file.response) {
    return [e.file.response]
  }
  return e && e.fileList
}

export const customRequestUpload = async (options: any, fetchUpload: any) => {
  const data = new FormData()
  data.append('file', options.file)
  try {
    const response: { data: { fileName: string } } = await fetchUpload(data)
    console.log('response', response)
    options.onSuccess({
      url: import.meta.env.VITE_SERVER_AVATAR + response.data.fileName,
    })
    message.success('File success uploaded!')
  } catch (e) {
    console.log(e)
    message.error('Upload Error: ' + e)
  }
}
