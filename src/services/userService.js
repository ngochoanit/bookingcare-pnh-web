import axios from '../axios'
//Api login
const handleLogin = (userEmail, userPassword) => {
    return axios.post('api/login', { email: userEmail, password: userPassword })
}
//api Get user
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
export const userService = { handleLogin, getAllUsers }