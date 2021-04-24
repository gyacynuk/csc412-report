import React, { useEffect, useMemo, useState } from 'react'
import styled, { withTheme } from 'styled-components'
import Button from '../../components/button'
import Input from '../../components/input'
import { errorToast, successToast } from '../../utils'
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';
import Api from '../../api'

const PageWrapper = styled.div`
    position: relative;
    margin: 32px 0;
`

const InviteCodeWrapper = styled.div`
    display: flex;
`

const ChartWrapper = styled.div`
    width: 100%;
    height: 300px;
    flex: ${props => props.flexGrow || 1} 0 0;
`

const ChartPanel = styled.div`
    width: 100%;
    display: flex;
    
    ${({ theme }) => theme.isMobile`
        flex-direction: column;
        ${ChartWrapper} {
            margin-bottom: 16px;
        }
    `}
`

const TrackRow = styled.div`
    margin: 16px 0;
    display: flex;
    justify-content: space-between;
`
const Divider = styled.div`
	width: 100%;
	height: 1px;
	background-color: ${({theme}) => theme.palette.text.light};
`

const Dashboard = props => {
    const [ inviteCode, setInviteCode ] = useState('')
    const [ chartData, setChartData ] = useState({ generatedInvites: 0, completedSurveys: 0 })
    const tracks = useMemo(() => Api.Audio.loadSurveyTracks(false), []) 

    useEffect(() => {
        Api.Stats.getChartStats()
            .then(stats => setChartData(stats))
    }, [])
   
    const data = useMemo(() => ([
        {
            name: 'Generated',
            count: chartData.generatedInvites,
        },
        {
            name: 'Completed',
            count: chartData.completedSurveys,
        },
    ]), [ chartData ])

    const copyCodeToClipboard = () => {
        if (!inviteCode) {
            errorToast('No invite code to copy')
            return
        }

        navigator.clipboard.writeText(inviteCode)
            .then(() => {
                successToast('Copied to clipboard')
            })
            .catch(error => {
                errorToast('Unable to copy to clipboard')
            })
    }

    const generateInviteCode = () => {
        Api.Invite.generateInviteCode()
            .then(res => {
                setInviteCode(res.username)
                setChartData(data => ({ ...data, generatedInvites: data.generatedInvites + 1 }))
            })
    }

    return (
        <PageWrapper>
            <h1>Dashboard</h1>

            <h3>Generate Invite Code</h3>
            <InviteCodeWrapper>
                <Input value={inviteCode} placeholder={'Click Generate to create a new code'} readOnly expand/>
                <Button label={'Copy'} margin={'0 0 0 24px'} onClick={copyCodeToClipboard}/>
                <Button label={'Generate'} margin={'0 0 0 8px'} onClick={generateInviteCode}/>
            </InviteCodeWrapper>
            <br/>

            <h3>Statistics</h3>
            <ChartPanel>
                <ChartWrapper flexGrow={1}>
                    <div><strong>Total Invites Generated:</strong> {chartData.generatedInvites}</div>
                    <div><strong>Total Surveys Completed:</strong> {chartData.completedSurveys}</div>
					<br/>
					<div><strong>Mean Training Score:</strong> {Math.round(chartData?.totalResults?.training?.correct * 10000 / chartData?.totalResults?.training?.total) / 10000}</div>
					<div><strong>Mean VAE Score:</strong> {Math.round(chartData?.totalResults?.vae?.correct * 10000 / chartData?.totalResults?.vae?.total) / 10000}</div>
					<div><strong>Mean RevNet Score:</strong> {Math.round(chartData?.totalResults?.rev?.correct * 10000 / chartData?.totalResults?.rev?.total) / 10000}</div>
                </ChartWrapper>
                <ChartWrapper flexGrow={1}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <Bar dataKey="count" fill={props.theme.palette.primary} />
                            <XAxis dataKey="name" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartWrapper>
            </ChartPanel>

            <h3>Survey Results</h3>
            {tracks.map((track, i) => (
				<div key={track.track}>
					<TrackRow>
						<div>
							<div><strong>Track:</strong> {track.track}</div>
							<div><strong>Score</strong> {chartData?.trackResults?.[track.track]?.correct}/{chartData?.trackResults?.[track.track]?.total}</div>
						</div>
						
						<audio controls src={track.src}/>
					</TrackRow>
					
					{i !== tracks.length-1 && <Divider />}
				</div>
            ))}
            
            
        </PageWrapper>
    )
}


export default withTheme(Dashboard)
