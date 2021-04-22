import axios from 'axios'
import { BASE_URL } from '.'

function authenticate(username) {
    const uninterceptedAxiosInstance = axios.create();
    return uninterceptedAxiosInstance.post(`${BASE_URL}/api/auth/login`, { username })
        .then(res => {
            const { user, hasCompletedSurvey } = res.data
            if (!user.isAdmin && hasCompletedSurvey) {
                return {
                    success: false,
                    errorMessage: 'You have already submitted your survey results'
                }
            }
            return {
                success: true,
                user,
            }
        })
        .catch(error => {
            let errorMessage = 'Something went wrong'
            if (error.response.status === 401) {
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