import { ReactNode } from 'react'

import { menuItems } from './data'
import * as S from './styles'

import { Header } from 'features/Header'
import { Sidebar } from 'features/Sidebar'
import { t } from 'languages'

interface I_DashboardLayout {
  children: ReactNode
}

export const DashboardLayout = ({ children }: I_DashboardLayout) => {
  return (
    <S.Layout>
      <Sidebar items={menuItems} selectedItem={location.pathname.split('/')[1]} />
      <S.LayoutWrapper>
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
