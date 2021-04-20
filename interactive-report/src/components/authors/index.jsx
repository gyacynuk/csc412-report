import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const OuterWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    margin-top: 24px;
`

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: .8rem;
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 24px;
`

const Authors = props => {
    return (
        <OuterWrapper>
            {props.authors.map(({ name, studentNumber, email }) => (
                <InnerWrapper key={name}>
                    <span><strong>{name}</strong></span>   
                    <span>{studentNumber}</span>   
                    <span>{email}</span>   
                </InnerWrapper>
            ))}
            
        </OuterWrapper>
    )
}

Authors.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        studentNumber: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    })).isRequired,
}

export default Authors
