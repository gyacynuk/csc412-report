import axios from 'axios'
import { BASE_URL } from '.'
import { errorToast } from '../utils';

function authenticate(password) {
    const uninterceptedAxiosInstance = axios.create();
    return uninterceptedAxiosInstance.post(`${BASE_URL}/api/auth/login`, password)
        .then(_ => ({
            success: true,
        }))
        .catch(error => {
            errorToast('testing')
            // switch (error.response.status) {
            //     case 400: return { message: 'You have an empty field.' }
            //     case 401: return { message: 'Your username or password is incorrect.' }
            //     default: return { message: 'Something went wrong, please try again.' }
            // }
            return {}
        })
}

const AuthApi = {
    authenticate,
}

export default AuthApi