import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SmallH3 = styled.h3`
    font-size: 1.3rem;
    display: inline-block;
`

const NumWrapper = styled.div`
    display: inline-block;
    width: 64px
`

const SectionSubHeader = forwardRef(({ num, header, ...rest }, ref) => {
    return (
        <div ref={ref} {...rest}>
            <SmallH3><NumWrapper>{num}</NumWrapper>{header}</SmallH3>
        </div>  
    )
})

SectionSubHeader.propTypes = {
    header: PropTypes.string.isRequired,
    num: PropTypes.string.isRequired,
}

export default SectionSubHeader
