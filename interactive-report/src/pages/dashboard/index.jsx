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

const Dashboard = props => {
    const [ inviteCode, setInviteCode ] = useState('')
    const [ chartData, setChartData ] = useState({ generatedInvites: 0, completedSurveys: 0 })

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
            
            
        </PageWrapper>
    )
}


export default withTheme(Dashboard)
