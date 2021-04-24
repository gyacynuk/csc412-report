import axios from 'axios'
import AuthApi from './auth'
import InviteApi from './invite'
import StatsApi from './stats'
import UserApi from './user'
import AudioApi from './audio'
import { errorToast } from '../utils'

// Configure API base URL based on environment
export const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://nice-music-synthesis.herokuapp.com'
    : 'http://localhost:5000'

// Axios global config
axios.defaults.withCredentials = true
axios.defaults.timeout = 5 * 1000
axios.interceptors.response.use(undefined, error => {
    if (error.response === undefined) {
        errorToast('Cannot connect to server')
    }
    else if (error.response.status === 401 && error.response.data === 'Expired Session') {
        window.location.href = '/login?expired'
    }
    else if (error.response.status === 401) {
        window.location.href = '/survey'
    }
    else if (error.response.status === 403) {
        errorToast('You do not have permission to do that')
    }
    else {
        errorToast('Oops, something went wrong, please try again')
    }
    return Promise.reject(error)
})

const Api = {
    Auth: AuthApi,
    Invite: InviteApi,
    Stats: StatsApi,
    User: UserApi,
    Audio: AudioApi,
}
export default Api