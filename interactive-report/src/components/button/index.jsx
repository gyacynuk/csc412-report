import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledButton = styled.button`
    width: ${props => props.width || 'auto'};
    height: ${props => props.height || 'auto'};
    padding: 8px 16px;
    margin: ${props => props.margin || '0'};

    background-color: ${({theme}) => theme.palette.background};
    color: ${({theme}) => theme.palette.text.regular};
    border: 1px solid ${({theme}) => theme.palette.text.heavy};
    border-radius: 8px;

    font-family: ${({theme}) => theme.typography.fontFamily};
    font-size: 1rem;

    outline: none;
    cursor: pointer;
    transition: all 400ms ease;

    &:hover {
        background-color: ${({theme}) => theme.palette.text.regular};
        color: ${({theme}) => theme.palette.background};
    }
`

const Button = ({ label, onClick, ...rest }) => {
    return (
        <StyledButton onClick={onClick} {...rest}>
            {label}
        </StyledButton>
    )
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,

    width: PropTypes.string,
    height: PropTypes.string,
    margin: PropTypes.string,
}

export default Button
