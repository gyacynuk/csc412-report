import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from '../../components/button'
import { useHistory } from 'react-router-dom'

const Wrapper = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ErrorPage = ({ title, message }) => {
    const history = useHistory()

    return (
        <Wrapper>
            <h1>{title}</h1>
            <div>{message}</div>
            <Button
                label={'Home'}
                margin={'16px 0'}
                onClick={() => history.push('/')}/>
        </Wrapper>
    )
}

ErrorPage.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
}

export default ErrorPage
