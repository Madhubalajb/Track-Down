import axios from 'axios'
const url = '/api/habits'

const getData = async () => {
    const response = await axios.get(url)
    return response.data
}

const addData = async (habit) => {
    const response = await axios.post(url, habit)
    return response.data
}

const deleteData = async (habit_id) => {
    const response = await axios.delete(`${url}/${habit_id}`)
    return response.data
}

const updateData = async (habit_id, habit) => {
    const response = await axios.put(`${url}/${habit_id}`, habit)
    return response.data
}

export default { getData, addData, deleteData, updateData}