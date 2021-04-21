import React from 'react'
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

const NotFoundPage = props => {
    const history = useHistory()

    return (
        <Wrapper>
            <h1>404</h1>
            <div>The page you were looking for could not be found</div>
            <Button
                label={'Home'}
                margin={'16px 0'}
                onClick={() => history.push('/')}/>
        </Wrapper>
    )
}

export default NotFoundPage
