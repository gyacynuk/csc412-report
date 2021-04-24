import React, { useRef } from 'react'
import Authors from '../../components/authors'
import { BlockMath, InlineMath } from 'react-katex'
import SectionHeader from '../../components/section-header'
import SectionSubHeader from '../../components/section-subheader'
import styled from 'styled-components'

import { ReactComponent as GithubSVG } from '../../assets/images/github.svg'
import { ReactComponent as RevBlockSVG } from '../../assets/images/revblock.svg'
import pitchPlotImg from '../../assets/images/pitch-plot.png'
import simplePrImg from '../../assets/images/simple-pr.png'
import complexPrImg from '../../assets/images/complex-pr.png'
import simplePrWav from '../../assets/audio/simple-pr.wav'
import complexPrWav from '../../assets/audio/complex-pr.wav'
import References from '../../components/references'
import SectionNavigator from '../../components/section-navigator'
import EquationLabel from '../../components/equation-label'

const PageWrapper = styled.div`
    position: relative;
    margin: 32px 0;
`

const IconButton = styled.div`
    margin-left: 16px;
    cursor: pointer;
`
const GithubIcon = styled(GithubSVG)`
    width: 40px;
    height: 100%;
    margin-top: -4px;

    ${({theme}) => theme.isMobile`
        height: 40px;
        margin-top: 0;
    `}
`
const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const Center = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const AbstractWrapper = styled.div`
    width: 80%;
    margin-left: 10%;
`
const AbstractHeader = styled.h3`
    width: 100%;
    text-align: center;
`

const RevBlockImg = styled(RevBlockSVG)`
    width: auto;
    height: 500px;
`

const Image = styled.img`
    width: 100%;
    margin: 4px 0;
    object-fit: contain;
`

const AudioWrapper = styled.div`
    margin-top: 8px;
` 

const DoublePane = styled.div`
    display: flex;
    justify-content: space-between;

    ${({theme}) => theme.isMobile`
        flex-direction: column;
    `}
`

const Paper = props => {
    const sections = [
        {
            name: 'Abstract',
            level: 1,
            ref: useRef(),
        },
        {
            name: '1 Background',
            level: 1,
            ref: useRef(),
        },
        {
            name: '2 Methods',
            level: 1,
            ref: useRef(),
        },
        {
            name: '2.1 Dataset and Preprocessing',
            level: 2,
            ref: useRef(),
        },
        {
            name: 'References',
            level: 1,
            ref: useRef(),
        },
    ]

    return (
        <PageWrapper>
            <SectionNavigator sections={sections}/>

            <HeaderWrapper>
                <h1>NICE Music Synthesis</h1>
                <IconButton onClick={() => window.open('https://github.com/gyacynuk/csc412-report/tree/main/notebooks')}>
                    <GithubIcon />
                </IconButton>
            </HeaderWrapper>
           
			<h4>CSC412 Final Project</h4>

            <Authors authors={[
                { name: 'Griffin Yacynuk', studentNumber: '1003019832', email: 'griffin.yacynuk@mail.utoronto.ca' },
                { name: 'Joanna Mo', studentNumber: '1004069946', email: 'joanna.mo@mail.utoronto.ca' },
                { name: 'Justin Smeal', studentNumber: '1003532073', email: 'justin.smeal@mail.utoronto.ca' },
            ]}/>

			
            <AbstractWrapper>
                <AbstractHeader ref={sections[0].ref}>Abstract</AbstractHeader>
                <p>
                    We propose an application of Non-linear Independent Component Estimation (NICE) for music synthesis. 
                    This technique has seen success when utilized for image synthesis, however we have seen no evidence of
                    its application for music synthesis. Specifically, we will train a model to learn a non-linear
                    deterministic transformation from our dataset of piano compositions to a latent space such that
                    components of the latent representation are independent and thus factorizable. By implementing this
                    mapping using a composition of Reversible Blocks, we ensure that it is both invertable and volume
                    preserving with respect to the probability distribution of our training data. Therefore we will be able
                    to synthesize new music by sampling from our latent space and then reversing the above transformation.
                </p>
            </AbstractWrapper>
		

            <SectionHeader num='1' header='Background' ref={sections[1].ref}/>
			<p>
                Given a dataset of musical compositions <InlineMath math='X'/> consisting of <InlineMath math='N'/> D-dimensional
                samples <InlineMath math='x'/>, <InlineMath math='x \in \mathbb{R}^D'/>, we want to learn a
                bijective differentiable function <InlineMath math='f_\theta: X \rightarrow Z'/>, which maps the data to
                some latent space <InlineMath math='Z'/>, where vector <InlineMath math='z = f_\theta(x)'/> has the same
                dimensionality as <InlineMath math='x'/>. Furthermore, we have the criterion that the transformation to the
                latent space results in a distribution that has independent components (for instance, independent Gaussians).
                Once <InlineMath math='f_\theta'/> is learned, we know its inverse is well-defined
                since <InlineMath math='f_\theta'/> is bijective. Therefore we can synthesize a new music
                sample <InlineMath math='\hat{x}'/> by sampling some <InlineMath math='\hat{x} \in Z'/>, and then inverting
                the transformation: <InlineMath math='\hat{x} = f_\theta^{-1}(\hat{z})'/>.
                Since <InlineMath math='z = f_\theta(x)'/> is comprised of independent components, we can factorize the
                likelihood of <InlineMath math='z'/>. as follows:
			</p>
            <EquationLabel label={'1'}>
                <BlockMath math='p_Z(z) = \prod_d^D p_{Z_d}(z_d)' />
            </EquationLabel>
			
            <p>
                Furthermore, since <InlineMath math='f'/> is bijective and differentiable it can be considered as a
                change-of-variables transformation. This allows us to rewrite the distribution
                of <InlineMath math='p_X(x)'/> in terms of <InlineMath math='p_Z(z)'/>:
            </p>
            <EquationLabel label={'2'}>
                <BlockMath math='
                    \begin{aligned}
                        p_X(x) &= p_Z(z) \begin{vmatrix}\frac{\partial z}{\partial x}\end{vmatrix}\\
                        &= p_Z(f_\theta(x)) \begin{vmatrix}\frac{\partial f_\theta(x)}{\partial x}\end{vmatrix}
                    \end{aligned}' />
            </EquationLabel>
            <p>
                At this point, our choice of <InlineMath math='f_\theta'/> becomes critical. We need it to be defined
                such that both its inverse, and determinant of the Jacobian are easy to compute. To achieve this, we
                leverage a network architecture called a <em>reversible architecture</em>, which is composed
                of <em>reversible blocks</em>. A reversible block is a computational layer that processes data as
                follows: first we split our input vector in two: <InlineMath math='x_1, x_2'/>. Then given some
                non-linear function <InlineMath math='\mathcal{F}'/> (such as a shallow neural network) we define new
                variables <InlineMath math='y_1, y_2'/> as follows:
            </p>
            <EquationLabel label={'3'}>
                <BlockMath math='
                    \begin{aligned}
                        y_1 &= x_1 + \mathcal{F}(x_2)\\
                        y_2 &= x_2
                    \end{aligned}' />
            </EquationLabel>
            <p>
                This set of operations comprises the reversible block. Now notice how this block is easily invertable,
                given <InlineMath math='y_1, y_2'/> we have the following inverse:
            </p>
            <EquationLabel label={'4'}>
                <BlockMath math='
                    \begin{aligned}
                        x_2 &= y_2\\
                        x_1 &= y_1 - \mathcal{F}(y_2)
                    \end{aligned}' />
            </EquationLabel>
            <p>
                Furthermore, our Jacobian is trivial to compute;
                concatenating <InlineMath math='x = x_1x_2'/> and <InlineMath math='y = y_1y_2'/> together, then
                differentiating equation (3) yields:
            </p>
            <EquationLabel label={'5'}>
                <BlockMath math='\frac{\partial y}{\partial x} = 
                    \begin{pmatrix}
                        1 & \frac{\partial \mathcal{F}}{\partial x_2}\\
                        0 & 1
                    \end{pmatrix}' />
            </EquationLabel>
            <p>
                We notice that this matrix is upper-triangular, and thus its determinant is computed as the sum along
                the diagonal. However, these values will always be <InlineMath math='1'/>, therefore making the determinant of the Jacobian
                trivially equate to <InlineMath math='1'/>. Finally, we can compose reversible blocks by alternating
                which half of the input vector is fed through <InlineMath math='\mathcal{F}'/>. Below we illustrate the
                composition of two reversible blocks given functions <InlineMath math='\mathcal{F}_1, \mathcal{F}_2'/>,
                and with <InlineMath math='\bigoplus'/> representing vector addition:
            </p>
            <Center>
                <RevBlockImg/>
            </Center>
            <p>
                Finally, we have a good choice of a function <InlineMath math='f_\theta: X \rightarrow Z'/> in the form
                of a reversible network. In order to train the network we will use the same objective function proposed
                by Dinh et. al [2], which is maximizing the negative log-likelihood over the dataset
                (of <InlineMath math='N'/> samples). This objective function makes sense since we saw in equation (5)
                that the determinant of the Jacobian is always 1 and thus this change-of-variables transformation
                is <em>volume preserving</em>. This fact forces <InlineMath math='f_\theta'/> to be injective,
                disallowing the degenerative case where <InlineMath math='f_\theta'/> maps all inputs a single value
                which maximizes likelihood (such as the origin). Returning to equation (2), we have:
            </p>
            <BlockMath math='
                \begin{aligned}
                    \mathcal{L(\theta)} &= -log (\prod_n^N (p_Z(f_\theta(x_n))\begin{vmatrix}\frac{\partial z}{\partial x_n}\end{vmatrix}))\\
                    &= -log (\prod_n^N (p_Z(f_\theta(x_n))))\\
                    &= - \sum_n^N log(p_Z(f_\theta(x_n)))\\
                    &= - \sum_n^N \sum_d^D log(p_{Z_d}(f_\theta(x_{n_d})))
                \end{aligned}'/>
            <p>
                In conclusion, we will train a reversible network to learn a mapping from our original dataset to some
                latent space using the above loss function. Then by sampling from our latent space and reversing the
                transformation as seen in equation (4) we will be able to generate new music samples.
            </p>


            <SectionHeader num='2' header='Methods' ref={sections[2].ref}/>
            <p>
                We now introduce our approach to music generation via NICE, implemented
                using <em>Reversible Residual Networks</em> (RevNets). 
            </p>

            <SectionSubHeader num='2.1' header='Dataset and Preprocessing' ref={sections[3].ref}/>
            <p>
                Our dataset is derived from the <a href='https://colinraffel.com/projects/lmd/'>Lakh MIDI Dataset</a> [1]
                - a collection of 174,154 multitrack pianorolls in MIDI format.
            </p>

            <Image src={pitchPlotImg}/>

            <DoublePane>
                <Center>
                    <div>A Simple Sample</div>
                    <Image src={simplePrImg}/>
                    <AudioWrapper>
                        <audio src={simplePrWav} controls />
                    </AudioWrapper>
                </Center>
                <Center>
                    <div>A More Complex Sample</div>
                    <Image src={complexPrImg}/>
                    <AudioWrapper>
                        <audio src={complexPrWav} controls />
                    </AudioWrapper>
                </Center>
            </DoublePane>


            <br/>
            <References ref={sections[sections.length-1].ref} citations={[
                <span>
                    Colin Raffel. "Learning-Based Methods for Comparing Sequences, with Applications to Audio-to-MIDI
                    Alignment and Matching". <em>PhD Thesis</em>, 2016.
                </span>,
                <span>
                    Laurent Dinh, David Krueger, and Yoshua Bengio. Nice: Non-linear independent components estimation,
                    2015.
                </span>
            ]}/>
            
        </PageWrapper>
    )
}

Paper.propTypes = {

}

export default Paper
