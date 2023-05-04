export enum E_MediaQuery {
  xl = '(max-width: 1140px)',
  lg = '(max-width: 960px)',
  md = '(max-width: 720px)',
  sm = '(max-width: 540px)',
}

export const theme = {
  // Source: https://getbootstrap.com/docs/4.0/layout/grid/
  palette: {
    primary: '#AB274F',
    layoutHeaderBackground: '#2D2D2D',
    layoutTriggerBackground: '#8B3550',
    overlay: '#00000080',
  },
  media: {
    xl: E_MediaQuery.xl,
    lg: E_MediaQuery.lg,
    md: E_MediaQuery.md,
    sm: E_MediaQuery.sm,
  },
  sizes: {
    header: { height: 56 },
  },
}

export type Theme = typeof theme
