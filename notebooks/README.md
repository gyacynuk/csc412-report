# Notebooks
This directory contains the notebooks used for conducting the research associated with this project.

## data.ipynb
This notebook is used for data preprocessing. Specifically segments a dataset of MIDI tracks into individual bars of
music, filters out bars that are empty or lack musical variety, and finally saves these bars of music in batches as
compressed .npz files.

## vae.ipynb
This notebook trains a VAE to generate music based on our training data, and samples from it. It is used as a
comparative baseline to analyze the performance of our RevNet implementation.

## revnet.ipynb
This notebook trains a RevNet to generate music based on our training data, and samples from it.