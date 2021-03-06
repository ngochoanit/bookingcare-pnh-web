import actionTypes from '../actions/actionTypes';
// const initContentOfConfirmModal = {
//     isOpen: false,
//     messageId: "",
//     handleFunc: null,
//     dataFunc: null
// }

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    allRequiredDoctorInfor: []

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        //action for gender
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                isLoadingGender: true
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                genders: action.data,
                isLoadingGender: false
            }
        case actionTypes.FETCH_GENDER_FAILED:
            return {
                ...state,
                isLoadingGender: false
            }
        //action positions
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                positions: action.data,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            return state
        //action role
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.data,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            return state
        //action all uers  
        case actionTypes.FETCH_ALL_USERS_SUCCESSED:
            return {
                ...state,
                users: action.data,
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            return state
        //fet top doctor 
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESSED:
            return {
                ...state,
                topDoctors: action.data
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            return state
        //fetch all doctor 
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESSED:
            return {
                ...state,
                allDoctors: action.data
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            return state
        //fetch all doctor 
        case actionTypes.SAVE_DETAIL_DOCTOR_SUCCESSED:
            return {
                ...state
            }
        case actionTypes.SAVE_DETAIL_DOCTOR_FAILED:
            return {
                ...state
            }
        //fetch all schedule time
        case actionTypes.FECTH_ALLCODE_SCHEDULE_TIME_SUCCESSED:
            return {
                ...state,
                allScheduleTime: action.data
            }
        case actionTypes.FECTH_ALLCODE_SCHEDULE_TIME_FAILED:
            return state
        //fetch all doctor infor
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESSED:

            return {
                ...state,
                allRequiredDoctorInfor: action.data
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            return state

        default:
            return state;
    }
}

export default adminReducer;