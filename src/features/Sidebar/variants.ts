import { Variants } from 'framer-motion'

export enum E_SidebarVariant {
  collapsed = 'collapsed',
  opened = 'opened',
}

export const sidebarWrapperVariants: Variants = {
  [E_SidebarVariant.collapsed]: {
    x: 0,
    width: 88,
    transition: {
      stiffness: 0,
    },
  },
  [E_SidebarVariant.opened]: {
    x: 0,
    width: 240,
    transition: {
      stiffness: 0,
    },
  },
}

export const sidebarTitleVariants: Variants = {
  [E_SidebarVariant.collapsed]: {
    x: -240,
    transition: {
      stiffness: 0,
    },
  },
  [E_SidebarVariant.opened]: {
    x: 0,
    transition: {
      stiffness: 0,
    },
  },
}

export const sidebarCollapseVariants: Variants = {
  [E_SidebarVariant.collapsed]: {
    x: 0,
    rotate: 180,
    transition: {
      stiffness: 0,
    },
  },
  [E_SidebarVariant.opened]: {
    x: 160,
    transition: {
      stiffness: 0,
    },
  },
}

export const sidebarListItemIconVariants: Variants = {
  [E_SidebarVariant.collapsed]: {
    x: 3,
    transition: {
      stiffness: 0,
    },
  },
  [E_SidebarVariant.opened]: {
    x: 0,
    transition: {
      stiffness: 0,
    },
  },
}

export const sidebarListItemTextVariants: Variants = {
  [E_SidebarVariant.collapsed]: {
    x: -240,
    transition: {
      stiffness: 0,
    },
  },
  [E_SidebarVariant.opened]: {
    x: 24,
    transition: {
      stiffness: 0,
    },
  },
}
