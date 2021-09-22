import axios from '../axios'
//service  login
const handleLogin = (userEmail, userPassword) => {
    return axios.post('api/login', { email: userEmail, password: userPassword })
}
//service Get user
const getAllUsersService = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
//create  new user
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}
//service delete user
const deleteUserService = (id) => {
    return axios.delete('/api/delete-user', { data: { id: id } })
}
//service edit user
const editUserService = (data) => {
    return axios.put('/api/edit-user', data)
}
//get all code service
const getAllCodeService = (inputData) => {
    return axios.get(`/api/get-all-code?type=${inputData}`)

}
//get outstanding doctor
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/get-top-doctor-home?limit=${limit}`)
}
//get all doctor services
const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`)
}
//post infor doctor services
const postInforDoctorSevice = (data) => {
    return axios.post("/api/save-infor-doctor", data)
}
//post infor doctor services
const getDetailInforDoctor = (data) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${data}`)
}
//post multi schedule
const postBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}
export const userService = {
    handleLogin,
    getAllUsersService,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctorsService,
    postInforDoctorSevice,
    getDetailInforDoctor,
    postBulkScheduleDoctor
}