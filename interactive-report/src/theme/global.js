import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *,
  :after,
  *::before {
    box-sizing: border-box;
    transition: color 400ms ease;
    transition: background-color 400ms ease;
  }
  
  html {
    font-size: ${({ theme }) => theme.typography.htmlFontSize}px;
    ${({ theme }) => theme.isMobile`
      font-size: 16px;
    `}
    font-family: ${({ theme }) => theme.typography.fontFamily};
  }

  body {
    margin: 0;
    color: ${({ theme }) => theme.palette.text.regular};
    background-color: ${({ theme }) => theme.palette.background};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-weight: ${({ theme }) => theme.typography.medium};
  }

  p {
    margin: 0;
    margin-bottom: 24px;
  }

  p .base {
    font-size: ${({ theme }) => theme.typography.inlineMath.fontSize};
  }

  h1 {
    margin: 0;
    margin-bottom: 8px;
    padding: 0;
    color: ${({ theme }) => theme.palette.text.heavy};
    font-family: ${({ theme }) => theme.typography.h1.fontFamily};
    font-size: ${({ theme }) => theme.typography.h1.fontSize};
    font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
    line-height: ${({ theme }) => theme.typography.h1.lineHeight};
  }
  
  h2 {
    margin: 0;
    margin-bottom: 8px;
    padding: 0;
    color: ${({ theme }) => theme.palette.text.heavy};
    font-family: ${({ theme }) => theme.typography.h2.fontFamily};
    font-size: ${({ theme }) => theme.typography.h2.fontSize};
    font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
    line-height: ${({ theme }) => theme.typography.h2.lineHeight};
  }

  h3 {
    margin: 0;
    margin-bottom: 8px;
    padding: 0;
    color: ${({ theme }) => theme.palette.text.heavy};
    font-family: ${({ theme }) => theme.typography.h3.fontFamily};
    font-size: ${({ theme }) => theme.typography.h3.fontSize};
    font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
    line-height: ${({ theme }) => theme.typography.h3.lineHeight};
  }

  h4 {
    margin: 0;
    margin-bottom: 8px;
    padding: 0;
    color: ${({ theme }) => theme.palette.text.light};
    font-family: ${({ theme }) => theme.typography.h4.fontFamily};
    font-size: ${({ theme }) => theme.typography.h4.fontSize};
    font-weight: ${({ theme }) => theme.typography.h4.fontWeight};
    line-height: ${({ theme }) => theme.typography.h4.lineHeight};
  }
`