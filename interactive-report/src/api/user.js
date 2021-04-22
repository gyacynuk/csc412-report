import axios from 'axios'
import { BASE_URL } from '.'

function getSessionUserNoInterceptor() {
    const uninterceptedAxiosInstance = axios.create()
    return uninterceptedAxiosInstance.get(`${BASE_URL}/api/user/session`)
        .then(res => {
            return res.data
        })
}

const UserApi = {
    getSessionUserNoInterceptor
}

export default UserApi