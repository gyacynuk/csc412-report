import React, {forwardRef} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const H3 = styled.h3`
    display: inline-block;
`

const NumWrapper = styled.div`
    display: inline-block;
    width: 64px
`

const SectionHeader = forwardRef(({ num, header, ...rest }, ref) => {
    return (
        <div ref={ref} {...rest}>
            <H3><NumWrapper>{num}</NumWrapper>{header}</H3>
        </div>
    )
})

SectionHeader.propTypes = {
    header: PropTypes.string.isRequired,
    num: PropTypes.string.isRequired,
}

export default SectionHeader
