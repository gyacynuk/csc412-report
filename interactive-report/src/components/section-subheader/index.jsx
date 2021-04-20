import React from 'react'
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

const SectionSubHeader = props => {
    return (
        <div>
            <SmallH3><NumWrapper>{props.num}</NumWrapper>{props.header}</SmallH3>
        </div>  
    )
}

SectionSubHeader.propTypes = {
    header: PropTypes.string.isRequired,
    num: PropTypes.string.isRequired,
}

export default SectionSubHeader
