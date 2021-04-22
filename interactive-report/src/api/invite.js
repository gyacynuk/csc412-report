import axios from 'axios'
import { BASE_URL } from '.'

function generateInviteCode() {
    return axios.post(`${BASE_URL}/api/user/generateInvite`)
        .then(res => {
            return res.data
        })
}

const InviteApi = {
    generateInviteCode
}

export default InviteApi