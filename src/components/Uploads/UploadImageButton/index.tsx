import { PlusOutlined } from '@ant-design/icons'

import { t } from 'languages'

export const UploadImageButton = () => {
  return (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{t('components.uploadImageButton.label')}</div>
    </div>
  )
}
