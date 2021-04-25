import React, { useRef } from 'react'
import Authors from '../../components/authors'
import { BlockMath, InlineMath } from 'react-katex'
import SectionHeader from '../../components/section-header'
import SectionSubHeader from '../../components/section-subheader'
import styled from 'styled-components'

import { ReactComponent as GithubSVG } from '../../assets/images/github.svg'
import { ReactComponent as RevBlockSVG } from '../../assets/images/revblock.svg'
import { ReactComponent as RevArchSVG } from '../../assets/images/rev-arch.svg'

import pitchPlotImg from '../../assets/images/pitch-plot.png'
import simplePrImg from '../../assets/images/simple-pr.png'
import complexPrImg from '../../assets/images/complex-pr.png'
import lossPlot from '../../assets/images/loss.png'
import vaeArch from '../../assets/images/VAE_diagram.png'
import rev1 from '../../assets/images/rev-1.png'
import rev3 from '../../assets/images/rev-3.png'
import vae0 from '../../assets/images/vae-0.png'
import vae1 from '../../assets/images/vae-1.png'
import comparison from '../../assets/images/comparison.png'

import simplePrWav from '../../assets/audio/simple-pr.wav'
import complexPrWav from '../../assets/audio/complex-pr.wav'
import rev1Wav from '../../assets/audio/survey/rev-1.wav'
import rev3Wav from '../../assets/audio/survey/rev-3.wav'
import vae0Wav from '../../assets/audio/survey/vae-0.wav'
import vae1Wav from '../../assets/audio/survey/vae-3.wav'

import References from '../../components/references'
import SectionNavigator from '../../components/section-navigator'
import EquationLabel from '../../components/equation-label'

const PageWrapper = styled.div`
    position: relative;
    margin: 32px 0;
`

const Reference = styled.strong`
    cursor: pointer;
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
const RevArchImg = styled(RevArchSVG)`
    width: 100%;
    height: auto;
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

const TableWrapper = styled.div`
    display: flex;
    justify-content: center;
    font-size: 0.8rem;
`

const TableInner = styled.div`
    width: 80%;
    max-width: 320px;
    padding: 4px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 2px solid ${({theme}) => theme.palette.text.heavy};
    border-bottom: 2px solid ${({theme}) => theme.palette.text.heavy};
`

const TableDivider = styled.div`
    width: 100%;
    height: 1px;
    margin: 2px 0;
    background-color: ${({theme}) => theme.palette.text.light};
`

const TableRow = styled.div`
    width: 100%;
    display: flex;  
    justify-content: space-between;
`

const TableCell = styled.div`
    width: 80px;
    text-align: center;
`

const Paper = props => {
    const sections = [
        {
            name: 'Abstract',
            level: 1,
            ref: useRef(),
        },
        {
            name: '1 Introduction',
            level: 1,
            ref: useRef(),
        },
        {
            name: '2 Background',
            level: 1,
            ref: useRef(),
        },
        {
            name: '3 Methods',
            level: 1,
            ref: useRef(),
        },
        {
            name: '3.1 Dataset and Preprocessing',
            level: 2,
            ref: useRef(),
        },
        {
            name: '3.2 Reversable Residual Network',
            level: 2,
            ref: useRef(),
        },
        {
            name: '3.3 Variational Autoencoder',
            level: 2,
            ref: useRef(),
        },
        {
            name: '3.4 Related Work',
            level: 2,
            ref: useRef(),
        },
        {
            name: '4 Discussion',
            level: 1,
            ref: useRef(),
        },
        {
            name: '5 Experiment',
            level: 1,
            ref: useRef(),
        },
        {
            name: '6 Conclusion',
            level: 1,
            ref: useRef(),
        },
        {
            name: 'References',
            level: 1,
            ref: useRef(),
        },
    ]

    const scrollTo = ref => {
        ref.current.scrollIntoView({behavior: "smooth"})
    }

    return (
        <PageWrapper>
            <SectionNavigator sections={sections}/>

            <HeaderWrapper>
                <h1>NICE Music Synthesis</h1>
                <IconButton onClick={() => window.open('https://github.com/gyacynuk/csc412-report')}>
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
                    We proposed an application of Non-linear Independent Component Estimation (NICE) for music synthesis.
                    This technique has seen success when utilized for image synthesis, however we have seen no evidence of
                    its application for music synthesis. Specifically, we have trained a model to learn a non-linear
                    deterministic transformation from our dataset of piano compositions to a latent space such that
                    components of the latent representation are independent and thus factorizable. By implementing this
                    mapping using a composition of Reversible Blocks, we ensured that it is both invertible and volume
                    preserving with respect to the probability distribution of our training data. Therefore we were able to
                    synthesize new music by sampling from our latent space and then reversing the aforementioned transformation. 
                </p>
            </AbstractWrapper>

            <SectionHeader num='1' header='Introduction' ref={sections[1].ref}/>
            <p>
                With the merging of generative models and deep learning, deep generative models (DGMs) were created.
                Popular architectures such as Generative Adversarial Networks (GANs) and Variational Autoencoders (VAEs)
                have seen much success when used in image generation contexts [1]. These models all attempt to approximate
                the complex distribution of training data through their many layers, which is later sampled from to generate
                new vectors in the data space. Therefore the ability to accurately represent the data is a crucial component
                of the model.  However, in the proposal for the Non-linear Independent Component Estimation (NICE), the
                question of "What is a good representation?" is raised [2]. Instead of modelling the underlying data distribution
                directly, NICE strives to learn a non-linear mapping from the data space to some comparatively simple latent
                space that is easy to model. By utilizing a deep Reversible Architecture (RevNet) to learn this function,
                we also gain the ability to compute its inverse. Therefore we can generate new vectors in the data space by
                inverting the NICE transformation previously learned, and applying it to random samples in the latent space.
            </p>
            <p>
                Given that such reversible architectures are powerful enough to compete with VAEs in an image generation
                context, we investigate to see if how the two types of generative models compare when applied a new category: music synthesis.
            </p>
		

            <SectionHeader num='2' header='Background' ref={sections[2].ref}/>
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


            <SectionHeader num='3' header='Methods' ref={sections[3].ref}/>
            <p>
                We now introduce our approach to music generation via NICE, implemented using Reversible Residual Networks
                (RevNets). Furthermore, we implement a VAE to perform the same generative task, thus acting as a comparative
                baseline from which we can evaluate the performance of our novel method of music synthesis.
            </p>

            <SectionSubHeader num='3.1' header='Dataset and Preprocessing' ref={sections[4].ref}/>
            <p>
                Our dataset is based on the cleansed Lakh Pianoroll Dataset (LPD-cleansed) [3], a dataset
                which itself is derived from the <a href='https://colinraffel.com/projects/lmd/'>Lakh MIDI Dataset</a> (LMD)
                [4] - a collection of 176,581 unique MIDI files. Specifically, LDP-cleansed contains 21,425 multitrack
                pianorolls where each track: is in <InlineMath math='\frac{4}{4}'/> time, has no time-signature changes,
                has its first beat starting from time zero, and has the highest confidence score provided by LMD.
            </p>
            <p>
                Given the LPD-cleansed dataset, we then segment each song into individual bars of music. Then we
                vectorize these bars into a <em>pianoroll format</em> using <em>symbolic timing</em>. A pianoroll is a
                matrix representation of music; it consists of 128 rows (one for each key on the piano), and an arbitrary
                number of columns, where each column represents the state of each key on the piano throughout time.
                Furthermore, we are encoding the pianorolls using symbolic timing with a temporal resolution of 24
                samples per beat as recommended by Hao-Wen Dong et. al. [3], as this allows us to properly encode common
                temporal patterns such as triplets and <InlineMath math='32^{nd}'/> notes. This means that each column
                vector of the pianoroll represents <InlineMath math='\frac{1}{24}^{th}'/> of a quarter note, and since
                we are in <InlineMath math='\frac{4}{4}'/> time, a bar of music is thus represented as a <InlineMath math='128x96'/> matrix,
                or a 12,288-dimensional vector when linearized.
            </p>

            <DoublePane>
                <Center>
                    <div>A Simple Pianoroll</div>
                    <Image src={simplePrImg}/>
                    <AudioWrapper>
                        <audio src={simplePrWav} controls />
                    </AudioWrapper>
                </Center>
                <Center>
                    <div>A More Complex Pianoroll</div>
                    <Image src={complexPrImg}/>
                    <AudioWrapper>
                        <audio src={complexPrWav} controls />
                    </AudioWrapper>
                </Center>
            </DoublePane>

            <br/>
            <p>
                Once we have segmented our dataset into individual bars of music, we then perform further filtering to
                ensure all bars are <em>musically viable</em>. This involves the following conditions: the bar of music
                must have a note being played for at least half (48 out of 96 timesteps) of its duration; the bar of
                music must contain at least 2 unique notes; the bar of music must not contain only notes sustained
                throughout the entire bar (to enforce musical diversity, we require at least one note to be played
                for less than half of the bar's duration). At the end of this process we are left with 53,821 bars of
                music that meet all of our criteria.
            </p>
            <Image src={pitchPlotImg}/>
            <p>
                The final preprocessing step is to reduce the dimensionality of our dataset. By analyzing the
                distribution of played notes over our dataset we discovered both the lowest 20 and highest 20 pitches
                are never played. Therefore we were able to reduce our dimensionality in a lossless fashion by clipping
                the top and bottom 20 rows from our pianorolls. This results in 8448-dimensional vectors once linearized,
                a reduction of nearly a third when compared to its original size.
            </p>
            
            <p></p>

            <SectionSubHeader num='3.2' header='Reversible Residual Network' ref={sections[5].ref}/>
            <RevArchImg/>
            <p>
                We trained a deep Reversible Residual Network to map our dataset of pianorolls into a fully-factorized
                Gaussian via NICE. We experimented with a variety of choices for our model's hyper-parameters, and
                discovered that the following configuration was empirically optimal: a sequence of 10 reversible blocks,
                where each block implements functions <InlineMath math='\mathcal{F}'/>, <InlineMath math='\mathcal{G}'/> (see <Reference onClick={() => scrollTo(sections[2].ref)}>Section 2</Reference>)
                as a shallow, fully-connected neural network with 1 hidden layer, ReLU activation, and batch normalization.
            </p>
            <Image src={lossPlot}/>
            <p>
                We trained the network for 200 epochs using SGD with momentum (which we found outperformed ADAM for our
                specific task), using a batch size of 256. Furthermore, we utilized a learning rate scheduler to anneal
                the learning rate in the event of a plateau. Finally, due to the depth of the network, we relied on
                gradient clipping to mitigate the exploding-gradient problem from occurring early-on in training.
            </p>
            <p></p>

            <SectionSubHeader num='3.3' header='Variational Autoencoder' ref={sections[6].ref}/>
            <Image src={vaeArch}/>
            <p>
                We used a Variational Autoencoder (VAE) as a baseline model to compare the quality of generated samples
                of music. We used parameters similar to those used in our implementation of RevNet to keep the
                comparison reasonable. 
            </p>
            <p>
                The general architecture, which can be seen above, contains an encoder to which maps input data to
                the variational parameters, the mean and the variance. Our implementation of the encoder uses batch
                normalization and ReLU, with a hidden layer of size 144. The output of the encoder is twice the size of
                the latent dimension, which in our implementation is 64 to make a relatively compact representation of
                the input data. 
            </p>
            <p>
                The output of the encoder is split into the two parameters, thus the dimension of each parameter is the
                batch size by the latent dimension, where they are then used to sample from the variational
                distribution using the reparameterization trick. We do so by expressing a random variable <InlineMath math='z'/> from the
                variational distribution as a differentiable transformation of another random variable <InlineMath math='\epsilon'/> given
                the mean and variance. 
            </p>
            <p>
                This sample is then passed to the decoder, where the reconstructed sample is created. Like the encoder,
                the decoder uses batch normalization and ReLU as well, however it has a hidden layer of size 96.
                The size of the output is the same as the input data size.
            </p>
            <p>
                The optimization goal of the VAE is the evidence lower bound, also known as the ELBO [5].
                In order to maximize the ELBO, we find the negative ELBO loss. This uses the Kullback-Leibler (KL)
                Term, <InlineMath math='\log{p(z)} - \log{q(z|x)}'/>, where <InlineMath math='z'/> is the sample from
                the variational distribution, <InlineMath math='x'/> is the input data, <InlineMath math='p'/> is a distribution
                (in our implementation we use the Normal distribution), and <InlineMath math='q'/> is the variational
                distribution. The other component is the Reconstruction Term, <InlineMath math='\log{p(x|z)}'/>. We
                take the sum of these log probability terms, and return the negative value of it as our negative ELBO loss.
            </p>
            <p>
                To generate our samples, we trained the VAE with data from the set described in <Reference onClick={() => scrollTo(sections[4].ref)}>Section 3.1</Reference>,
                with a batch size of 100 for 200 epochs. 
            </p>
            <p></p>

            <SectionSubHeader num='3.4' header='Related Work' ref={sections[7].ref}/>
            <p>
                <strong>NICE: Non-linear Independent Components Estimation</strong> Our project uses the framework presented in this paper as a generative model for music.  This model provides many useful properties which facilitate our work.  For example, the transformed data is represented by a factorized distribution, which results in independent latent variables.  It is also easy to compute the determinants of the Jacobian and inverse Jacobian, which makes the transformation easily invertible, allowing for the ability to apply the inverse transformation to samples from the latent distribution in order to generate samples of music.  Finally, the training criterion is negative log-likelihood, which is easy to compute.  In summary, the NICE framework allows us to model an easily reversible complex non-linear transformation between a latent space and music samples, allowing us to easily synthesize new music. [2]
            </p>
            <p>
                <strong>The Reversible Residual Network: Backpropagation Without Storing Activations</strong> This paper introduces a reversible model which was inspiration for the NICE framework discussed previously. The presented model is a memory efficient version of ResNets, where the memory efficiency comes from the fact that the activations of each layer can be computed using only the subsequent layer's activations. This means that most layers do not need to have their activations contained in memory during the training process. Our work uses the ideas behind this reversible model to be able to easily generate music samples by applying the inverse of the learned transformation to samples from a latent distribution. [6]
            </p>
            <p>
                <strong>Convolutional Generative Adversarial Networks with Binary Neurons for Polyphonic Music Generation</strong> This paper utilizes multi-track piano-rolls and a convolutional GAN-based model to generate binary-valued piano-rolls.  A binary-valued piano-roll is a binary-valued matrix with rows corresponding to pitches and columns corresponding to time.  The paper proposes the addition of a refiner network at the end of the generator network of a GAN, which has binary neurons at the output layer, in order to allow the entire network to directly generate binary-valued piano rolls.  We used this model as inspiration for working with piano-roll data. [7]
            </p>
            <p>
                <strong>PyPianoRoll</strong> This Python library was used as a tool for processing MIDI files, converting them into pianoroll formats, and making pianoroll visualizations as well. [8]
            </p>
            <p>
                <strong>RevTorch</strong> The implementation of a RevNet requires a complex backwards step in order to back-propagate derivatives, which includes certain hand-derived gradients. As the goal of this project was to compare the efficacy of a RevNet when applied to music generation, we chose to leverage an existing implementation (RevTorch) instead of creating our own, which allowed us to focus more time on hyper-parameter optimization, ultimately allowing us to produce the higher quality audio samples. [9]
            </p>
            <p></p>

            <SectionHeader num='4' header='Discussion' ref={sections[8].ref}/>
            <p>
                It is clear that the RevNet is a powerful model, even capable of learning very complex transformations
                from our data space of music tracks to a simple latent space. The generated samples that the model 
                produces often have a clear musical quality, including a noticeable melody, and a consistent rhythm.
                Furthermore, it was surprising to see that the model was able to align notes correctly according to
                the <InlineMath math='\frac{4}{4}'/> time-signature, as evident in the visualized pianorolls below; notice that notes often
                start and end on the quarter-note marks. This precision is very impressive, especially considering the
                massive dimensionality of the input and latent spaces.
            </p>
            <p>
            One rather large short-coming of the model is the fact that it is particularly susceptible to generating noise artifacts during the reversal process. This often manifests itself as the "stuttering" or "tapping" of a note that ideally should be sustained. A potential improvement to the model would be the addition of some sort of smoothing function which would be run after the reversal process to reduce the noise seen in our outputs.
            </p>

            <DoublePane>
                <Center>
                    <div>RevNet Sample 1</div>
                    <Image src={rev1}/>
                    <AudioWrapper>
                        <audio src={rev1Wav} controls />
                    </AudioWrapper>
                </Center>
                <Center>
                    <div>RevNet Sample 2</div>
                    <Image src={rev3}/>
                    <AudioWrapper>
                        <audio src={rev3Wav} controls />
                    </AudioWrapper>
                </Center>
            </DoublePane>

            <br/>
            <p>
                Samples produced by the VAE often have a good sense of beat and rhythm. Additionally, we often see that
                notes of different pitches are in sync; that is, they start or end at a similar time. However,
                the complexity of the tracks typically generated by the VAE tend to be simple in nature, especially when
                contrasted against those generated by the RevNet. This is not at all surprising, as the authors of
                MusicVAE have shown that a vanilla VAE does not generally perform well at the task of music
                generation [10].
            </p>

            <DoublePane>
                <Center>
                    <div>VAE Sample 1</div>
                    <Image src={vae0}/>
                    <AudioWrapper>
                        <audio src={vae0Wav} controls />
                    </AudioWrapper>
                </Center>
                <Center>
                    <div>VAE Sample 2</div>
                    <Image src={vae1}/>
                    <AudioWrapper>
                        <audio src={vae1Wav} controls />
                    </AudioWrapper>
                </Center>
            </DoublePane>

            <br/>
            <p>
                A short-coming shared by both models is the fact that the dataset unfortunately contains some poor samples,
                that are lacking in musical diversity. Despite our best efforts to filter such tracks out, some still exist
                in our training dataset. This lowers the overall potential of both models.
            </p>

            <DoublePane>
                <Center>
                    <div>Training Sample 1</div>
                    <Image src={simplePrImg}/>
                    <AudioWrapper>
                        <audio src={simplePrWav} controls />
                    </AudioWrapper>
                </Center>
                <Center>
                    <div>Training Sample 2</div>
                    <Image src={complexPrImg}/>
                    <AudioWrapper>
                        <audio src={complexPrWav} controls />
                    </AudioWrapper>
                </Center>
            </DoublePane>

            <br/>
            <SectionHeader num='5' header='Experiment' ref={sections[9].ref}/>
            <p>
                To evaluate the ability of the RevNet as well as our baseline model of the VAE, we created a survey 
                consisting of 20 samples of music, 10 of which were randomly drawn from the training set, as well as 5
                generated samples from each model. All samples were then shuffled and presented sequentially to each participant.
                Participants were tasked with determining whether each audio clip was human or AI generated.
                In order to ensure the participants had reasonable prior knowledge, they were informed that
                "roughly half the tracks have been made by humans". Finally, the participant could listen to a track as
                many times as they wanted, however once they selected a response they would be presented with the next
                track and could not go back. You can try a mock survey <a href={'/guest-survey'} target='_blank'>here</a>.
            </p>
            <p>
                The purpose of the survey was to extrinsically evaluate the efficacy of our model, determining if it
                could create music samples that were high enough in quality that they would be indistinguishable
                from a human-played sample. Furthermore, it allowed us to compare the two models, determining whether
                the RevNet or VAE is better suited at music generation.
            </p>
            <p>
                The survey had a total of 30 respondents who were invited to participate via a one-time use access code.
                This ensures that all responses are high quality, and prevents a bad actor from polluting the results.
            </p>

            <TableWrapper>
                <div><strong>Table 1: Mean Scores</strong></div>
            </TableWrapper>
            <TableWrapper>
                <TableInner>
                    <div>Sample Type</div>
                    <TableDivider/>
                    <TableRow>
                        <TableCell>Training</TableCell>
                        <TableCell>VAE</TableCell>
                        <TableCell>RevNet</TableCell>
                    </TableRow>
                    <TableDivider/>
                    <TableRow>
                        <TableCell>0.64</TableCell>
                        <TableCell>0.58</TableCell>
                        <TableCell><strong>0.56</strong></TableCell>
                    </TableRow>
                </TableInner>
            </TableWrapper>
            
            <br/>
            <p>
                The mean scores as seen in <strong>Table 1</strong> above indicate the proportion of correctly
                classified tracks from each source. We see that the samples from the RevNet were misclassified more
                often than those coming from the VAE, indicating that survey participants mistook these tracks for 
                being human generated 44% of the time (despite only 42% of the time with the VAE). While the data
                suggests that the RevNet is the better model, unfortunately there is not enough data to draw a
                statistically significant conclusion.
            </p>

            <Image src={comparison}/>
            <p></p>
            
            <SectionHeader num='6' header='Conclusion' ref={sections[10].ref}/>
            <p>
                We demonstrated that Non-linear Independent Component Estimation (NICE) implemented via a Reversible
                Residual Network is a valid technique for the task of music generation. By comparing this technique with
                a basic Variational Autoencoder we have shown it to be just as capable, if not more, in this domain.
                However, both models can be susceptible to the quality of the data used for training. Finally,
                through the use of a closed survey, we were able to measure and quantify the quality of the music 
                produced by our model. 
            </p>

            <br/>
            <References ref={sections[sections.length-1].ref} citations={[
                <span>
                    Lars Ruthotto and Eldad Haber. An introduction to deep generative modeling, 2021.
                </span>,
                <span>
                    Laurent Dinh, David Krueger, and Yoshua Bengio. Nice: Non-linear independent components estimation, 2015.
                </span>,
                <span>
                    Li-Chia Yang Hao-Wen Dong, Wen-Yi Hsiao and Yi-Hsuan Yang. Musegan: Multi-track sequential generative adversarial networks for symbolic music generation and accompaniment. <em>32nd AAAI Conferenceon Artificial Intelligence (AAAI)</em>, 2018.
                </span>,
                <span>
                    Colin Raffel. "Learning-Based Methods for Comparing Sequences, with Applications to Audio-to-MIDI
                    Alignment and Matching". <em>PhD Thesis</em>, 2016.
                </span>,
                <span>
                    Diederik P. Kingma and Max Welling.  An introduction to variational autoencoders. <em>Foundations and Trends<sup>®</sup> in Machine Learning</em>, 12(4):307–392, 2019.
                </span>,
                <span>
                    Aidan N. Gomez, Mengye Ren, Raquel Urtasun, and Roger B. Grosse. The reversible residual network: Backpropagation without storing activations, 2017.
                </span>,
                <span>
                    Hao-Wen Dong and Yi-Hsuan Yang. Convolutional generative adversarial networks with binary neurons for polyphonic music generation, 2018
                </span>,
                <span>
                    Wen-Yi Hsiao Hao-Wen Dong and Yi-Hsuan Yang. Pypianoroll: Open source python package for handling multitrack pianoroll. <em>Late-Breaking
                    Demos of the 19th International Society for Music Information Retrieval Conference (ISMIR)</em>, 2018.
                </span>,
                <span>
                    Robin Brügger, Christian F. Baumgartner, and Ender Konukoglu. A partially reversible u-net for memory-efficient volumetric image segmentation. <em>arXiv:1906.06148</em>, 2019
                </span>,
                <span>
                    Adam Roberts, Jesse Engel, Colin Raffel, Curtis Hawthorne, and Douglas Eck. A hierarchical latent vector model for learning long-term structure in music, 2019.
                </span>
            ]}/>
            
        </PageWrapper>
    )
}

Paper.propTypes = {

}

export default Paper
