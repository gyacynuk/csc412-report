import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const H3 = styled.h3`
    display: inline-block;
`

const NumWrapper = styled.div`
    display: inline-block;
    width: 64px
`

const SectionHeader = props => {
    return (
        <div>
            <H3><NumWrapper>{props.num}</NumWrapper>{props.header}</H3>
        </div>
    )
}

SectionHeader.propTypes = {
    header: PropTypes.string.isRequired,
    num: PropTypes.string.isRequired,
}

export default SectionHeader
