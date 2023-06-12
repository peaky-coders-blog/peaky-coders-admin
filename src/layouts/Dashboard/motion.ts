import { HTMLMotionProps } from 'framer-motion'

import * as v from './variants'

export const layoutWrapperAttrs = (
  isCollapsed: boolean,
  isMobile: boolean,
): HTMLMotionProps<'div'> => ({
  animate: isMobile
    ? v.E_SidebarVariant.mobile
    : isCollapsed
    ? v.E_SidebarVariant.collapsed
    : v.E_SidebarVariant.opened,
  variants: v.layoutWrapperVariants,
})
