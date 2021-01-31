import axios from 'axios'
const url = '/api/habits'
let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getData = async () => {
    const response = await axios.get(url)
    return response.data
}

const addData = async (habit) => {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.post(url, habit, config)
    return response.data
}

const deleteData = async (habit_id) => {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.delete(`${url}/${habit_id}`, config)
    return response.data
}

const updateData = async (habit_id, habit) => {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.put(`${url}/${habit_id}`, habit, config)
    return response.data
}

export default { setToken, getData, addData, deleteData, updateData}