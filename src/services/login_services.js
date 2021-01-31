import axios from 'axios'
const url = 'api/login'

const login = async (creadentials) => {
    const response = await axios.post(url, creadentials)
    return response.data
}

export default {login}