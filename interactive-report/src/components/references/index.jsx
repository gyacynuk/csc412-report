import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ReferenceWrapper = styled.div`
    display: flex;
    margin: 4px 0;
`

const Num = styled.div`
    width: 48px;
`

const Citation = styled.div`
    flex-basis: 0;
    flex-grow: 1;
`

const References = forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <h3>References</h3>
            {props.citations.map((citation, i) => (
                <ReferenceWrapper key={i}>
                    <Num>[{i+1}]</Num>
                    <Citation>
                        {citation}
                    </Citation>
                </ReferenceWrapper>
            ))}
        </div>
    )
})

References.propTypes = {
    citations: PropTypes.arrayOf(PropTypes.node).isRequired,
}

export default References
