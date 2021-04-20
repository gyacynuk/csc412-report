import { css } from 'styled-components'

const mobileMax = '1023px'

export const isMobile = (...args) => css`
  @supports (display: grid) {
    @media (max-width: ${mobileMax}) {
      ${css(...args)}
    }
  }
`