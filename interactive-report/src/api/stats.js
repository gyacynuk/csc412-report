import axios from 'axios'
import { BASE_URL } from '.'

function getChartStats() {
    return axios.get(`${BASE_URL}/api/stats/chart`)
        .then(res => {
            return res.data
        })
}

const StatsApi = {
    getChartStats
}

export default StatsApi