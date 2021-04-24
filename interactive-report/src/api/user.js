import axios from 'axios'
import { BASE_URL } from '.'

function getSessionUserNoInterceptor() {
    const uninterceptedAxiosInstance = axios.create()
    return uninterceptedAxiosInstance.get(`${BASE_URL}/api/user/session`)
        .then(res => res.data)
}

function submitSurvey(responses) {
    return axios.post(`${BASE_URL}/api/user/survey`, { responses })
        .then(res => res.data)
}

const UserApi = {
    getSessionUserNoInterceptor,
    submitSurvey,
}

export default UserApi