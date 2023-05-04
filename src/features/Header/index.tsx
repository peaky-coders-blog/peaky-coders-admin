import { MenuOutlined, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Dropdown, Modal } from 'antd'

import { headerTitles, profileMenu } from './data'
import * as S from './styles'

import { sidebarActions } from 'features/Sidebar/slice'
import { useCurrentPath } from 'hooks/useCurrentPath'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { useStoreDispatch } from 'hooks/useStoreDispatch'
import { useStoreSelector } from 'hooks/useStoreSelector'
import { t } from 'languages'
import { profileActions } from 'store/profile'
import { E_MediaQuery } from 'styles/theme'

export const Header = () => {
  const dispatch = useStoreDispatch()
  const profile = useStoreSelector((state) => state.profile)

  const currentPath = useCurrentPath()
  const isMatch = useMediaQuery(E_MediaQuery.md)

  const handleOpenSidebar = () => {
    dispatch(sidebarActions.openSidebar())
  }

  const handleLogout = () => {
    Modal.confirm({
      title: t('modal.confirm.logout.title'),
      icon: <ExclamationCircleOutlined />,
      content: t('modal.confirm.logout.content'),
      okText: t('modal.confirm.logout.ok'),
      cancelText: t('modal.confirm.logout.cancel'),
      maskClosable: true,
      onOk: () => {
        dispatch(profileActions.logout())
      },
    })
  }

  return (
    <S.HeaderWrapper>
      <S.HeaderLeftSection>
        {isMatch && <Button onClick={handleOpenSidebar} shape='circle' icon={<MenuOutlined />} />}
        <S.HeaderTitle>{t(headerTitles[currentPath])}</S.HeaderTitle>
      </S.HeaderLeftSection>

      <Dropdown menu={profileMenu({ onLogout: handleLogout })} placement='bottomLeft'>
        <S.HeaderRightSection>
          <S.HeaderProfileInfo>
            <UserOutlined />
            <S.HeaderProfileInfoName>{profile.email}</S.HeaderProfileInfoName>
          </S.HeaderProfileInfo>
        </S.HeaderRightSection>
      </Dropdown>
    </S.HeaderWrapper>
  )
}
