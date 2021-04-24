import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledButton = styled.button`
    width: ${props => props.width || 'auto'};
    height: ${props => props.height || 'auto'};
    margin: ${props => props.margin || '0'};
    padding: 8px 16px;

    background-color: ${({theme}) => theme.palette.background};
    border-radius: 8px;
    ${props => props.disabled
        ? `
            color: ${props.theme.palette.text.light};
            border: 1px solid ${props.theme.palette.text.light};
            cursor: not-allowed;
        `
        : `
            color: ${props.theme.palette.text.regular};
            border: 1px solid ${props.theme.palette.text.heavy};
            cursor: pointer;
        `
    }
    
    font-family: ${({theme}) => theme.typography.fontFamily};
    font-size: 1rem;

    outline: none;
    transition: all 400ms ease;

    &:hover {
        background-color: ${props => props.disabled ?
            props.theme.palette.background
            : props.theme.palette.text.regular};
        color: ${props => props.disabled
            ? props.theme.palette.text.light
            : props.theme.palette.background};
    }
`

const Button = ({ label, onClick, disabled, ...rest }) => {
    return (
        <StyledButton onClick={() => !disabled && onClick()} disabled={disabled} {...rest}>
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
    disabled: PropTypes.bool,
}

export default Button
