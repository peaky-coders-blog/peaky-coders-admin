import { HTMLMotionProps } from 'framer-motion'

import * as v from './variants'

export const sidebarWrapperAttrs = (
  isCollapsed: boolean,
  isMobile: boolean,
): HTMLMotionProps<'div'> => ({
  initial: { x: isMobile ? (isCollapsed ? -90 : -250) : 0 },
  animate: isCollapsed ? v.E_SidebarVariant.collapsed : v.E_SidebarVariant.opened,
  exit: { x: isMobile ? (isCollapsed ? -90 : -250) : 0 },
  variants: v.sidebarWrapperVariants,
})

export const sidebarTitleAttrs = (isCollapsed: boolean): HTMLMotionProps<'span'> => ({
  initial: false,
  animate: isCollapsed ? v.E_SidebarVariant.collapsed : v.E_SidebarVariant.opened,
  variants: v.sidebarTitleVariants,
})

export const sidebarCollapseAttrs = (isCollapsed: boolean): HTMLMotionProps<'span'> => ({
  animate: isCollapsed ? v.E_SidebarVariant.collapsed : v.E_SidebarVariant.opened,
  variants: v.sidebarCollapseVariants,
})

export const sidebarListItemIconAttrs = (isCollapsed: boolean): HTMLMotionProps<'span'> => ({
  animate: isCollapsed ? v.E_SidebarVariant.collapsed : v.E_SidebarVariant.opened,
  variants: v.sidebarListItemIconVariants,
})

export const sidebarListItemTextAttrs = (isCollapsed: boolean): HTMLMotionProps<'span'> => ({
  animate: isCollapsed ? v.E_SidebarVariant.collapsed : v.E_SidebarVariant.opened,
  variants: v.sidebarListItemTextVariants,
})

export const sidebarOverlayAttrs = (): HTMLMotionProps<'div'> => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
})
