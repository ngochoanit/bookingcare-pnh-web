import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
import { userService } from '../../services/userService'
//Fetch gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {

        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await userService.getAllCodeService('gender')
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            }
            else {
                dispatch(fetchGenderFailed())
            }
        }
        catch (e) {
            dispatch(fetchGenderFailed())
            console.log("fetchGenderStart error", e)
        }
    }

}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

// Fetch position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {

        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START })
            let res = await userService.getAllCodeService('position')
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            }
            else {
                dispatch(fetchPositionFailed())
            }
        }
        catch (e) {
            dispatch(fetchPositionFailed())
            console.log("fetchPositionFailed", e)
        }
    }

}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

//Fetch role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {

        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })
            let res = await userService.getAllCodeService('role')
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            }
            else {
                dispatch(fetchRoleFailed())
            }
        }
        catch (e) {
            dispatch(fetchRoleFailed())
            console.log("fetchRoleFailed", e)
        }
    }

}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

//Create a new user
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeeded");
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart())
            }
            else {
                toast.error(res.errMessage);
                dispatch(saveUserFailed())
            }
        }
        catch (e) {
            dispatch(saveUserFailed())
            console.log("saveUserFailed", e)
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESSED
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

//Delete user
export const deleteUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.deleteUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Delete user successed");
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart())
            }
            else {
                toast.error("Delete user failed");
                dispatch(deleteUserFailed())
            }
        }
        catch (e) {
            dispatch(deleteUserFailed())
            console.log("deleteUserFailed", e)
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESSED
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

//EDIT user
export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Edit user successed");
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())
            }
            else {
                toast.error("Ddit user failed");
                dispatch(editUserFailed())
            }
        }
        catch (e) {
            dispatch(editUserFailed())
            console.log("editUserFailed", e)
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESSED
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})
//Fetch all user
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllUsersService('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccessed(res.users.reverse()))
            }
            else {
                dispatch(fetchAllUsersFailed())
            }
        }
        catch (e) {
            dispatch(fetchAllUsersFailed())
            console.log("fetchAllUsersFailed", e)
        }
    }

}
export const fetchAllUsersSuccessed = (usersData) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESSED,
    data: usersData,
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

//Fetch top dotor
export const fetchTopDoctors = () => {
    return async (dispatch, getState) => {
        try {
            const res = await userService.getTopDoctorHomeService('6')
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorsSuccessed(res.data))
            }
            else {
                dispatch(fetchTopDoctorsFailed())
            }
        }
        catch (e) {
            dispatch(fetchTopDoctorsFailed())
            console.log("fetchTopDoctorsFailed", e)
        }
    }
}
export const fetchTopDoctorsSuccessed = (usersData) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESSED,
    data: usersData,
})
export const fetchTopDoctorsFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
})
//Fetch all doctors
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            const res = await userService.getAllDoctorsService()
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorsSuccessed(res.data))
            }
            else {
                dispatch(fetchAllDoctorsFailed())
            }
        }
        catch (e) {
            dispatch(fetchAllDoctorsFailed())
            console.log("fetchAllDoctorsFailed", e)
        }
    }
}
export const fetchAllDoctorsSuccessed = (doctors) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESSED,
    data: doctors,
})
export const fetchAllDoctorsFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
})
//Save detail doctor
export const saveDetailDoctor = (data) => {
    console.log('action', data)
    return async (dispatch, getState) => {
        try {
            const res = await userService.postInforDoctorSevice(data)
            if (res && res.errCode === 0) {
                toast.success("Save information doctor successfully");
                dispatch(saveDetailDoctorSuccessed(res.data))
            }
            else {
                toast.error("Save information doctor failed");
                dispatch(saveDetailDoctorFailed())
            }
        }
        catch (e) {
            dispatch(saveDetailDoctorFailed())
            console.log("saveDetailDoctorFailed", e)
        }
    }
}
export const saveDetailDoctorSuccessed = (doctors) => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESSED,
})
export const saveDetailDoctorFailed = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
})
//Fetch all schedule
export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            const res = await userService.getAllCodeService("TIME")
            if (res && res.errCode === 0) {
                dispatch(fetchAllScheduleTimeSuccessed(res.data))
            }
            else {
                dispatch(fetchAllScheduleTimeFailed())
            }
        }
        catch (e) {
            dispatch(fetchAllScheduleTimeFailed())
            console.log("fetchAllScheduleTimeFailed", e)
        }
    }
}
export const fetchAllScheduleTimeSuccessed = (times) => ({
    type: actionTypes.FECTH_ALLCODE_SCHEDULE_TIME_SUCCESSED,
    data: times,
})
export const fetchAllScheduleTimeFailed = () => ({
    type: actionTypes.FECTH_ALLCODE_SCHEDULE_TIME_FAILED
})