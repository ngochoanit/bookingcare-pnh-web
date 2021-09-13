import axios from '../axios'
//service  login
const handleLogin = (userEmail, userPassword) => {
    return axios.post('api/login', { email: userEmail, password: userPassword })
}
//service Get user
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
//
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}
//service delete user
const deleteUser = (id) => {
    return axios.delete('/api/delete-user', { data: { id: id } })
}
//service edit user
const editUser = (data) => {
    return axios.put('/api/edit-user', data)
}
//get all code service
const getAllCodeService = (inputData) => {
    return axios.get(`/api/get-all-code?type=${inputData}`)

}
export const userService = {
    handleLogin,
    getAllUsers,
    createNewUserService,
    deleteUser,
    editUser,
    getAllCodeService
}