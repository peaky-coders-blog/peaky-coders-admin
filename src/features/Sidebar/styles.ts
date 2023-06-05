import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

import * as m from './motion'

interface I_SidebarProps {
  isCollapsed: boolean
}

export const SidebarWrapper = styled(motion.div).attrs<I_SidebarProps & { isMobile: boolean }>(
  ({ isCollapsed, isMobile }) => m.sidebarWrapperAttrs(isCollapsed, isMobile),
)<{ isMobile: boolean; isCollapsed: boolean }>`
  z-index: 100;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: space-between;

  max-width: 240px;
  height: 100vh;

  color: #ffffffa6;

  background-color: ${({ theme }) => theme.palette.layoutHeaderBackground};
  box-shadow: rgba(0, 0, 0, 15%) 1.95px 1.95px 2.6px;

  ${({ isMobile }) =>
    isMobile
      ? css`
          position: absolute;
          min-width: 88px;
        `
      : css`
          position: relative;
        `}
`

export const SidebarInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
`

export const SidebarLabel = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  padding: 16px 16px 0;
`

export const SidebarTitle = styled(motion.span).attrs<I_SidebarProps>(({ isCollapsed }) =>
  m.sidebarTitleAttrs(isCollapsed),
)<I_SidebarProps>`
  position: absolute;

  width: 156px;

  font-size: 18px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
`

export const SidebarCollapse = styled(motion.span).attrs<I_SidebarProps>(({ isCollapsed }) =>
  m.sidebarCollapseAttrs(isCollapsed),
)<I_SidebarProps>`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 56px;
  height: 56px;

  border-radius: 8px;

  transition: color ease 500ms, background-color ease 500ms;

  :hover {
    color: #fff;

    background-color: ${({ theme }) => theme.palette.layoutTriggerBackground};
  }
`

export const SidebarList = styled.ul`
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;

  height: calc(100vh - 80px);
  padding-inline: 16px;

  ::-webkit-scrollbar {
    width: 2px;
  }

  ::-webkit-scrollbar-track {
    background-color: #1e1939;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #fff;
  }
`

export const SidebarListItem = styled.li<{ isActive: boolean }>`
  position: relative;
  user-select: none;

  width: 100%;
  min-width: 56px;
  height: 49px;
  padding: 16px;

  border-radius: 8px;

  transition: color ease 500ms, background-color ease 500ms;

  ${({ isActive }) =>
    isActive
      ? css`
          background-color: ${({ theme }) => theme.palette.primary};
          color: #fff;
        `
      : css`
          :hover {
            color: #fff;

            background-color: ${({ theme }) => theme.palette.layoutTriggerBackground};
          }
        `}
`

export const SidebarListItemIcon = styled(motion.span).attrs<I_SidebarProps>(({ isCollapsed }) =>
  m.sidebarListItemIconAttrs(isCollapsed),
)<I_SidebarProps>`
  position: absolute;
`

export const SidebarListItemTextOverflow = styled.div`
  position: relative;

  overflow: hidden;

  height: 100%;
  margin-left: 24px;
`

export const SidebarListItemText = styled(motion.span).attrs<I_SidebarProps>(({ isCollapsed }) =>
  m.sidebarListItemTextAttrs(isCollapsed),
)<I_SidebarProps>`
  position: absolute;
  left: -24px;

  overflow: hidden;

  width: 190px;
`
export const SidebarOverlay = styled(motion.div).attrs(m.sidebarOverlayAttrs)`
  position: fixed;
  z-index: 90;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: ${({ theme }) => theme.palette.overlay};
  backdrop-filter: blur(2px);
`
