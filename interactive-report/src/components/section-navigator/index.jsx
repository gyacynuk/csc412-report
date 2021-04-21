import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const LEVEL_WIDTH = {
    1: '40px',
    2: '30px',
    3: '16px'
}
const MIN_LINE_WIDTH = '12px'
const MAX_TEXT_WIDTH = '200px'
const ROW_HEIGHT = '14px'
const TRANSITION_DELAY = 40

const LineWrapper = styled.div`
    width: ${LEVEL_WIDTH[1]};
    margin-right: calc(-${LEVEL_WIDTH[1]} + ${MIN_LINE_WIDTH});
    padding: ${ROW_HEIGHT} 0;
` 
const Line = styled.div`
    width: ${props => LEVEL_WIDTH[props.level]};
    height: 3px;
    background-color: ${({theme}) => theme.palette.text.regular};
    transition: 400ms ease;
    border-radius 0 2px 2px 0;
    transition-delay: ${props => props.index * TRANSITION_DELAY}ms;
`

const TextWrapper = styled.div`
    width: 1px;
    height: calc(2*${ROW_HEIGHT});
    line-height: calc(2*${ROW_HEIGHT});
    padding-left: 8px;
    opacity: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: all 400ms ease;

    font-size: 0.8rem;
    font-weight: 500;
    color: ${({theme}) => theme.palette.text.light};

    &:hover {
        color: ${({theme}) => theme.palette.text.regular};
    }
`

const RowWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`

const Wrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    cursor: pointer;

    ${({theme}) => theme.isMobile`
        display: none;
    `}

    &:hover {
        ${Line} {
            width: ${MIN_LINE_WIDTH};
        }
        ${TextWrapper} {
            width: ${MAX_TEXT_WIDTH};
            opacity: 1;
        }
    }
`

const scrollTo = ref => {
    if (ref?.current) {
        ref.current.scrollIntoView({behavior: "smooth"})
    }
}

const SectionNavigator = ({sections}) => {
    return (
        <Wrapper>
            {sections.map(({ name, level, ref }, i) => (
                <RowWrapper key={name} onClick={() => scrollTo(ref)}>
                    <LineWrapper>
                        <Line level={level} index={i}/>
                    </LineWrapper>
                    <TextWrapper index={i}>
                        {name}
                    </TextWrapper>
                </RowWrapper>
            ))}
        </Wrapper>
    )
}

SectionNavigator.propTypes = {
    sections: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        ref: PropTypes.object.isRequired,
    }),).isRequired,
}

export default SectionNavigator
