import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import Button from '../../components/button'
import { useHistory, useLocation } from 'react-router'
import Api from '../../api'
import Input from '../../components/input'

const PageWrapper = styled.div`
    position: relative;
    margin: 32px 0;
`

const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 16px;
`

const Dash = styled.span`
    font-size: 1.5rem;
    font-weight: 300;
    padding: 0 8px;
`

const ErrorMessageAnimation = keyframes`
    from {
        opacity: 0;
    }
    to { 
        opacity: 1;
    }
`

const ErrorMessage = styled.div`
    width: 100%;
    padding: 12px;

    background-color: ${({theme}) => theme.palette.warning.light};
    color: ${({theme}) => theme.palette.warning.regular};
    border: 1px solid ${({theme}) => theme.palette.warning.regular}};
    border-radius: 8px;
    margin-bottom: 16px;

    animation: ${ErrorMessageAnimation} 400ms ease;
`

const useQuery = () => new URLSearchParams(useLocation().search)

const SurveyLogin = ({ setUser }) => {
    const query = useQuery()
    const history = useHistory()
    const [ form, setForm ] = useState({
        0: {
            value: '',
            ref: useRef(),
        },
        1: {
            value: '',
            ref: useRef(),
        },
        2: {
            value: '',
            ref: useRef(),
        }
    })
    const [ error, setError] = useState(query.has('expired')
        ? 'Your session has expired, please enter your invitation code again'
        : '')

    const handlePaste = e => {
        e.preventDefault()
        
        const code = e.clipboardData.getData('Text')
        const tokens = code.split('-')
        const updatedForm = { ...form }

        for (let i = 0; i < Math.min(tokens.length, 3); i ++) {
            updatedForm[i].value = tokens[i]
        }

        setForm(updatedForm)
    }

    const handleChange = i => e => {
        if (e?.nativeEvent?.data === '-') {
            const nextInput = form?.[i+1]?.ref?.current
            if (nextInput) {
                nextInput.focus()
            }
        } else {
            setForm({
                ...form,
                [i]: {
                    ...form[i],
                    value: e.target.value
                }
            })
        }
    }

    const submitForm = () => {
        if (!form[0].value || !form[1].value || !form[2].value) {
            setError('Please fill out all three fields')
            return
        }

        const password = [form[0].value, form[1].value, form[2].value].map(val => val.trim().toLowerCase()).join('-')
        Api.Auth.authenticate(password)
            .then(res => {
                const { success, user, errorMessage } = res
                if (success) {
                    setUser(user)
                    if (user.isAdmin) {
                        history.push('/dashboard')
                    } else {
                        history.push('/survey')
                    }
                } else {
                    setError(errorMessage)
                }
            })
    }

    return (
        <PageWrapper>
            <h1>Listening Survey</h1>

            {!query.has('expired') &&
                <>
                    <h3>Overview</h3>
                    <p>
                        You have been invited to participate in an online listening survey in which you will listen to several
                        short music clips, some of which are played by humans and others which are synthesized by a machine
                        learning model. Your task is to identify the source of each clip.
                    </p>

                    <h3>Purpose</h3>
                    <p>
                        We are interested in evaluating and comparing the the quality of music produced by
                        machine learning models. By participating in this survey, your results will allow us to
                        evaluate the performance of our models extrinsically, in a statistically significant fashion.
                    </p>

                    <h3>Confidentiality</h3>
                    <p>
                        If you choose to participate in the survey, your results will be saved to a database and will only be
                        identifiable via your randomly generated 3-word participation code. Aside from your responses to the
                        survey questions, no other data will be collected or stored. Finally, only aggregate statistics
                        derived from your responses will be published to the web.
                    </p>

                    <h3>Login</h3>
                    <p>
                        Please enter your invite code below to start the survey.
                    </p>
                </>
            }

            
            { error && <ErrorMessage>{error}</ErrorMessage> }

            <InputWrapper onKeyDown={e => e.key === 'Enter' && submitForm(form, history)}>
                <Input ref={form[0].ref} value={form[0].value} onChange={handleChange(0)} onPaste={handlePaste} expand/>
                <Dash>-</Dash>
                <Input ref={form[1].ref} value={form[1].value} onChange={handleChange(1)} expand/>
                <Dash>-</Dash>
                <Input ref={form[2].ref} value={form[2].value} onChange={handleChange(2)} expand/>
            </InputWrapper>

            <ButtonWrapper>
                <Button label={'Activate Code'} onClick={() => submitForm(form, history)}/>
            </ButtonWrapper>
            
        </PageWrapper>
    )
}

SurveyLogin.propTypes = {
    setUser: PropTypes.func.isRequired,
}

export default SurveyLogin
