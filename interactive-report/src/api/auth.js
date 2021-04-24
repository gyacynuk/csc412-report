import axios from 'axios'
import { BASE_URL } from '.'
import { errorToast } from '../utils'

function authenticate(username) {
    const uninterceptedAxiosInstance = axios.create()
    return uninterceptedAxiosInstance.post(`${BASE_URL}/api/auth/login`, { username })
        .then(res => {
            const { user } = res.data
            if (!user.isAdmin && user.completedSurvey) {
                return {
                    success: false,
                    errorMessage: 'You have already completed the survey'
                }
            }
            return {
                success: true,
                user,
            }
        })
        .catch(error => {
            let errorMessage = 'Something went wrong'
            if (error.response === undefined) {
                errorToast('Cannot connect to server')
            }
            else if (error.response.status === 401) {
                errorMessage = 'Invalid invitation code'
            }
            return {
                success: false,
                errorMessage
            }
        })
}

const AuthApi = {
    authenticate,
}

export default AuthApi