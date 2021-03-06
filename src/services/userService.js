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
//post extra doctor services
const getExtraInforDoctor = (data) => {
    return axios.get(`/api/get-extra-doctor-by-id?id=${data}`)
}
//post profile doctor services
const getProfileDoctor = (data) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${data}`)
}
//post multi schedule
const postBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}
const postVerifytBookAppointment = (data) => {
    return axios.post(`/api/verify-booking-appointment`, data)
}
const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}
const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`)
}
const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.specialtyId}&location=${data.location}`)
}
const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}
const getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`)
}
const getDetailClinicById = (clinicId) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${clinicId}`)
}
const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-paytient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const sendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data)
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
    postBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctor,
    getProfileDoctor,
    postPatientBookAppointment,
    postVerifytBookAppointment,
    createNewSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
    createNewClinic,
    getAllClinic,
    getDetailClinicById,
    getAllPatientForDoctor,
    sendRemedy
}