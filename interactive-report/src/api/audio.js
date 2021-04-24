import training0 from '../assets/audio/survey/training-0.wav'
import training1 from '../assets/audio/survey/training-1.wav'
import training2 from '../assets/audio/survey/training-2.wav'
import training3 from '../assets/audio/survey/training-3.wav'
import training4 from '../assets/audio/survey/training-4.wav'
import training5 from '../assets/audio/survey/training-5.wav'
import training6 from '../assets/audio/survey/training-6.wav'
import training7 from '../assets/audio/survey/training-7.wav'
import training8 from '../assets/audio/survey/training-8.wav'
import training9 from '../assets/audio/survey/training-9.wav'

import vae0 from '../assets/audio/survey/vae-0.wav'
import vae1 from '../assets/audio/survey/vae-1.wav'
import vae2 from '../assets/audio/survey/vae-2.wav'
import vae3 from '../assets/audio/survey/vae-3.wav'
import vae4 from '../assets/audio/survey/vae-4.wav'

function loadSurveyTracks() {
    const createSurveyModels = (srcs, source, expected) => srcs.map(
        (src, i) => ({
            src,
            track: `${source}-${i}`,
            source,
            expected,
        }))
    

    const shuffleInPlace = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const trainingTracks = createSurveyModels([
        training0,
        training1,
        training2,
        training3,
        training4,
        training5,
        training6,
        training7,
        training8,
        training9
    ], 'training', true)
    const vaeTracks = createSurveyModels([
        vae0,
        vae1,
        vae2,
        vae3,
        vae4,
    ], 'vae', false)
    
    const allTracks = [ ...trainingTracks, ...vaeTracks ]
    shuffleInPlace(allTracks)
    return [ allTracks[1], allTracks[2], allTracks[3] ]
}

const AudioApi = {
    loadSurveyTracks
}

export default AudioApi