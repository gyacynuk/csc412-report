import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const OuterWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const InnerWrapper = styled.div`
    width: 800px;

    ${({ theme }) => theme.isMobile`
        width: 90%;
    `}
`

const ContentWrapper = props => {
    return (
        <OuterWrapper>
            <InnerWrapper>
                {props.children}
            </InnerWrapper>
        </OuterWrapper>
    )
}

ContentWrapper.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ContentWrapper
