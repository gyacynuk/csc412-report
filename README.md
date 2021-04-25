# csc412-report
This project is an interactive report completed as coursework for CSC412, by Griffin Yacynuk, Joanna Mo, and Justin Smeal.
In this project, we propose and investigate an application of Non-linear Independent Component Estimation(NICE) for music synthesis.  
This technique has seen success when utilized for image synthesis, however we have seen no evidence of its application for music synthesis.
Specifically, we trained a model to learn a non-linear deterministic transformation from our dataset of piano compositions to a latent space such that components of the latent representation are independent and thus factorizable. By implementing this mapping using a composition of Reversible Blocks, we ensured that it is both invertable and volume preserving with respect to the probability distribution of our training data. Therefore we were able to synthesize new music by sampling from our latent space and then reversing the aforementioned transformation.

## notebooks
This directory contains the notebooks used for conducting the research associated with this project. Here we clean data,
implement both a RevNet and VAE architecture, and train these models to synthesize new music.

## interactive-report
This directory contains the code used to build the front-end of the interactive report. It also is where we built the
custom survey which we used for extrinsic model evaluation.

## server
This directory contains the code used to build the server hosting the interactive report. It is also responsible for
managing the survey, and computing results.