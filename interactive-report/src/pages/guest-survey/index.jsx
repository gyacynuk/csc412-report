import React, { useState, useMemo } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import Api from '../../api'
import Button from '../../components/button'
import { errorToast } from '../../utils'

const PageWrapper = styled.div`
    position: relative;
    margin: 32px 0;
`

const Center = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const Audio = styled.audio`
    margin: 48px 0 32px 0;
`

const ProgressWrapper = styled.div`
    position: relative;
    width: 100%;
    text-align: center;
    border-radius: 4px;
    border: 1px solid ${({theme}) => theme.palette.text.regular};
    overflow: hidden;
    font-size: 0.8rem;
`

const ProgressBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: ${props => props.progress}%;
    height: 100%;
    background-color: ${({theme}) => theme.palette.text.regular};
    transition: width 400ms ease;    
`

const ProgressInnerText  = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: ${({theme}) => theme.palette.background};
    clip-path: inset(0% ${props => props.progress}% 0% 0%);
    transition: 400ms ease;
`

const GuestSurveyPage = props => {
    const [ step, setStep ] = useState('intro')
    const [ trackNum, setTrackNum ] = useState(1)
    const [ buttonDisabled, setButtonDisabled ] = useState(true)
    const initialSurvey = useMemo(() => Api.Audio.loadSurveyTracks(true), [])
    const [ survey, setSurvey ] = useState(initialSurvey)

    const answerQuestion = choice => () => {
        const isHuman = choice === 'human'
        const updatedSurvey = [ ...survey ]
        updatedSurvey[trackNum-1].answer = isHuman
        updatedSurvey[trackNum-1].isCorrect = isHuman === updatedSurvey[trackNum-1].expected
        setSurvey(updatedSurvey)

        const nextTrackNum = trackNum + 1
        if (trackNum === updatedSurvey.length) {    // trackNum is 1-indexed
            setStep('thanks')    
        } else {
            setTrackNum(nextTrackNum)
            setButtonDisabled(true)
        }
    }

    return (
        <PageWrapper>
            <h1>Mock Listening Survey</h1>

            {/* Introduction */}
            {step === 'intro' && 
                <>
                    <h3>Instructions</h3>
                    <p>
                        You will be presented with {survey.length} sample audio tracks, each corresponding to a bar of music. Your task is
                        to determine if the audio track was generated by a human or an AI. <strong>Roughly half the tracks have been made by humans.</strong> You
                        can listen to each track multiple times, however once you make a choice, you will not be able go back and change it.
                    </p>
                    <Center>
                        <Button label={'Begin Survey'} onClick={() => setStep('survey')}/>
                    </Center>
                </>
            }

            {/* Survey */}
            {step === 'survey' && 
                <>
                    <h3>Track {trackNum}</h3>
                    <ProgressWrapper>
                        {Math.round(trackNum * 100 / survey.length)}%
                        <ProgressBar progress={Math.round(trackNum * 100 / survey.length)}/>
                        <ProgressInnerText progress={100-Math.round(trackNum * 100 / survey.length)}>
                            {Math.round(trackNum * 100 / survey.length)}%
                        </ProgressInnerText>
                    </ProgressWrapper>
                    

                    <Center>
                        <Audio
                            src={survey[trackNum-1].src}
                            autoPlay
                            controls
                            onEnded={() => setButtonDisabled(false)}/>
                    </Center>
                    
                    <Center>
                        <Button
                            label={'Human'}
                            width={'100px'}
                            margin={'0 16px 0 0'}
                            disabled={buttonDisabled}
                            onClick={answerQuestion('human')}/>
                        <Button
                            label={'AI'}
                            width={'100px'}
                            disabled={buttonDisabled}
                            onClick={answerQuestion('ai')}/>
                    </Center>
                </>
            }

            {/* Thank you */}
            {step === 'thanks' && 
                <>
                    <h3>Thank you</h3>
                    <p>
                        Thank you for completing the survey! You scored {survey.map(s => s.isCorrect).filter(Boolean).length}/{survey.length}. Your responses have been recorded.
                    </p>
                    
                </>
            }
        </PageWrapper>
    )
}

GuestSurveyPage.propTypes = {

}

export default GuestSurveyPage