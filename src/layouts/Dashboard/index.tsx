import { ReactNode } from 'react'

import { menuItems } from './data'
import * as S from './styles'

import { Header } from 'features/Header'
import { Sidebar } from 'features/Sidebar'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { useStoreSelector } from 'hooks/useStoreSelector'
import { t } from 'languages'
import { E_MediaQuery } from 'styles/theme'

interface I_DashboardLayout {
  children: ReactNode
}

export const DashboardLayout = ({ children }: I_DashboardLayout) => {
  const { isCollapsed } = useStoreSelector((state) => state.sidebar)
  const isMobile = useMediaQuery(E_MediaQuery.md)

  console.log('isCollapsed', isCollapsed)

  return (
    <S.Layout>
      <Sidebar items={menuItems} selectedItem={location.pathname.split('/')[1]} />
      <S.LayoutWrapper isSidebarCollapsed={isCollapsed} isMobile={isMobile}>
        <Header />
        <S.LayoutContainer>
          <S.LayoutContent>{children}</S.LayoutContent>
          <S.LayoutFooter>
            {t('app.copyright')} — {t('app.title')} <b>{APP_VERSION}</b>
          </S.LayoutFooter>
        </S.LayoutContainer>
      </S.LayoutWrapper>
    </S.Layout>
  )
}
