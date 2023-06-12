import { motion } from 'framer-motion'
import styled from 'styled-components'

import * as m from './motion'

export const Layout = styled.div`
  display: flex;
  flex-direction: 'row';

  min-height: 100vh;
`

interface LayoutWrapperProps {
  isSidebarCollapsed: boolean
  isMobile: boolean
}
export const LayoutWrapper = styled(motion.div).attrs<LayoutWrapperProps>(
  ({ isMobile, isSidebarCollapsed }) => m.layoutWrapperAttrs(isSidebarCollapsed, isMobile),
)<LayoutWrapperProps>`
  display: flex;
  flex: auto;
  flex-direction: column;

  width: 100%;

  background: #f0f2f5;
`

export const LayoutContainer = styled.div`
  position: relative;

  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: calc(100vh - ${({ theme }) => theme.sizes.header.height}px);
  padding: 16px;
`

export const LayoutContent = styled.div`
  height: fit-content;
`
export const LayoutFooter = styled.div`
  margin-top: 8px;

  text-align: center;
`
