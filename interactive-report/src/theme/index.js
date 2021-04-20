import typography from './typography'
import globalStyle from './global'
import { lightPalette, darkPalette } from './palette'
import { isMobile } from './breakpoint'

const sharedTheme = {
    isMobile,
    typography,
}

export const lightTheme = {
    palette: lightPalette,
    ...sharedTheme
}

export const darkTheme = {
    palette: darkPalette,
    ...sharedTheme
}

export const GlobalStyleComponent = globalStyle