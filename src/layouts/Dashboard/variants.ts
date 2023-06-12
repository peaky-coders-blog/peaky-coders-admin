import { Variants } from 'framer-motion'

export enum E_SidebarVariant {
  collapsed = 'collapsed',
  opened = 'opened',
  mobile = 'mobile',
}
export const layoutWrapperVariants: Variants = {
  [E_SidebarVariant.collapsed]: {
    paddingLeft: 88,
    transition: {
      stiffness: 0,
    },
  },
  [E_SidebarVariant.opened]: {
    paddingLeft: 240,
    transition: {
      stiffness: 0,
    },
  },
  [E_SidebarVariant.mobile]: {
    paddingLeft: 0,
  },
}
