import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledInput = styled.input`
    width: ${props => props.width || 0};
    padding: ${props => props.padding || '8px 16px'}; 
    background-color: ${({theme}) => theme.palette.background};
    color: ${({theme}) => theme.palette.text.regular};
    border: 1px solid ${({theme}) => theme.palette.text.heavy};
    border-radius: 8px;
    outline: none;

    font-family: ${({theme}) => theme.typography.fontFamily};
    font-size: 1rem;

    ${props => props.expand && `
        flex-basis: 0;
        flex-grow: 1;
    `}
`

const Input = forwardRef((props, ref) => {
    return (
        <StyledInput {...props} ref={ref}/>
    )
})

Input.propTypes = {
    width: PropTypes.string,
    expand: PropTypes.bool,
}

export default Input
