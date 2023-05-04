import { LeftOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

import { T_MenuItem } from './models'
import { sidebarActions } from './slice'
import * as S from './styles'

import { useMediaQuery } from 'hooks/useMediaQuery'
import { useStoreDispatch } from 'hooks/useStoreDispatch'
import { useStoreSelector } from 'hooks/useStoreSelector'
import { t } from 'languages'
import { E_MediaQuery } from 'styles/theme'

interface I_SidebarProps {
  items: T_MenuItem[]
  selectedItem: string
}

export const Sidebar = ({ items, selectedItem }: I_SidebarProps) => {
  const dispatch = useStoreDispatch()
  const { isOpen, isCollapsed } = useStoreSelector((state) => state.sidebar)
  const isMobile = useMediaQuery(E_MediaQuery.md)

  const handleClose = () => {
    dispatch(sidebarActions.closeSidebar())
  }

  const handleToggleCollapse = () => {
    dispatch(sidebarActions.toggleSidebarCollapse())
  }

  return (
    <AnimatePresence>
      {(!isMobile || isOpen) && (
        <>
          <S.SidebarWrapper isMobile={isMobile} isCollapsed={isCollapsed}>
            <S.SidebarInner>
              <S.SidebarLabel>
                <S.SidebarTitle isCollapsed={isCollapsed}>
                  {t('dashboard.sidebar.title')}
                </S.SidebarTitle>
                <S.SidebarCollapse isCollapsed={isCollapsed} onClick={handleToggleCollapse}>
                  <LeftOutlined />
                </S.SidebarCollapse>
              </S.SidebarLabel>
              <S.SidebarList>
                {items.map((item) => (
                  <Link key={item.key} to={item.to}>
                    <Tooltip placement='right' title={isCollapsed && t(item.label)}>
                      <S.SidebarListItem isActive={item.key === selectedItem}>
                        <S.SidebarListItemIcon isCollapsed={isCollapsed}>
                          {item.icon}
                        </S.SidebarListItemIcon>
                        <S.SidebarListItemTextOverflow>
                          <S.SidebarListItemText isCollapsed={isCollapsed}>
                            {t(item.label)}
                          </S.SidebarListItemText>
                        </S.SidebarListItemTextOverflow>
                      </S.SidebarListItem>
                    </Tooltip>
                  </Link>
                ))}
              </S.SidebarList>
            </S.SidebarInner>
          </S.SidebarWrapper>
          {isMobile && <S.SidebarOverlay onClick={handleClose} />}
        </>
      )}
    </AnimatePresence>
  )
}
