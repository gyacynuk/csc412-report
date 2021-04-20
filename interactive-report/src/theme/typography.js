const fontFamily = '"CMUSerifRoman", Georgia, serif'
const htmlFontSize = 20

const light = 300
const regular = 400
const semiBold = 500
const bold = 700

const typography = {
    htmlFontSize,
    fontFamily,
    light,
    regular,
    semiBold,
    bold,
    h1: {
        fontFamily: fontFamily,
        fontWeight: semiBold,
        fontSize: '3rem',
        lineHeight: 1.2,
    },
    h2: {
        fontFamily: fontFamily,
        fontWeight: regular,
        fontSize: '2.25rem',
        lineHeight: 1.2,
    },
    h3: {
        fontFamily: fontFamily,
        fontWeight: regular,
        fontSize: '1.75rem',
        lineHeight: 1.2,
    },
    h4: {
        fontFamily: fontFamily,
        fontWeight: regular,
        fontSize: '1.5rem',
        lineHeight: 1.28,
    },
    body: {
        fontFamily: fontFamily,
        fontWeight: regular,
        fontSize: '1rem',
        lineHeight: 1.5,
    },
    inlineMath: {
        fontSize: '.9rem',
    }
}
export default typography