import actionTypes from '../actions/actionTypes';
import { userService } from '../../services/userService'
const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
}

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
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
            console.log("FETCH_GENDER_FAILED")
            return {
                ...state,
                isLoadingGender: false
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                positions: action.data,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.data,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;