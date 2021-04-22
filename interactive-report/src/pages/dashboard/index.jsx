import React, { useState } from 'react'
import styled, { withTheme } from 'styled-components'
import Button from '../../components/button'
import Input from '../../components/input'
import { errorToast } from '../../utils'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

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
    display: flex;
    flex-direction: column;
    align-items: center;
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
   
    const data = [
        {
            name: 'Generated',
            count: 12,
        },
        {
            name: 'Activated',
            count: 4,
        },
    ];

    const copyCodeToClipboard = () => {
        navigator.clipboard.writeText(inviteCode)
            .catch(error => {
                errorToast('Unable to copy to clipboard')
            })
    }

    const generateInviteCode = () => {

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
                <div><strong>Generation vs Activation</strong></div>  
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} label='asa'>
                            <Tooltip />
                            <Bar dataKey="count" fill={props.theme.palette.primary} />
                            <XAxis dataKey="name" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartWrapper>
                <ChartWrapper flexGrow={2}>
                <div><strong>Activation by Day</strong></div>  
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <Tooltip />
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
