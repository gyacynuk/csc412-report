import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
    position: relative;
    width: 100%;
`

const Label = styled.div`
    position: absolute;
    top: 50%;
    right: 0;
    font-weight: 500;
    transform: translate(0, -50%);
`

const EquationLabel = ({ label, children }) => {
    return (
        <Wrapper>
            <Label>({label})</Label>
            {children}
        </Wrapper>
    )
}

EquationLabel.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default EquationLabel
