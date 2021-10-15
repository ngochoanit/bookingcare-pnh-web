import React, { Component } from 'react'
import { connect } from "react-redux"

import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils/constant'
import { userService } from '../../../services/userService'

import { FormattedMessage } from 'react-intl'
import Select from 'react-select'
// import DatePicker from '../../../components/Input/DatePicker'
import { toast } from 'react-toastify';
import moment from 'moment'
import _ from 'lodash';

import DatePicker, { registerLocale } from "react-datepicker";
import VI from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";
import RemadyModal from './RemedyModal'
import LoadingOverlay from 'react-loading-overlay';
import './ManagePatient.scss'


class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: new Date(new Date().setHours(0, 0, 0, 0)),
            doctorId: '',
            listPayment: [],
            isOpenModal: false,
            dataModal: {},
            iShowLoading: false,
        }
    }
    async componentDidMount() {
        registerLocale("vi", VI)

        let resPaymentAllForDoctor = await userService.getAllPatientForDoctor({
            doctorId: this.props.userInfo.id,
            date: this.state.currentDate.getTime()
        })

        if (resPaymentAllForDoctor && resPaymentAllForDoctor.errCode === 0) {

            this.setState({
                listPayment: resPaymentAllForDoctor.data
            })
        }
        this.setState({
            doctorId: this.props.userInfo.id
        })

    }
    componentDidUpdate(prevProps, prevState) {

        if (prevProps.language !== this.props.language) {

        }
    }
    buildDataInputSelect = (inputData) => {
        let result = []
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item) => {
                let obj = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName} `
                obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                obj.value = item.id
                return result.push(obj)
            })
        }
        return result
    }

    handleDatePickerChange = async (date) => {
        let resPaymentAllForDoctor = await userService.getAllPatientForDoctor({
            doctorId: this.state.doctorId,
            date: date.getTime()
        })

        if (resPaymentAllForDoctor && resPaymentAllForDoctor.errCode === 0) {

            this.setState({
                listPayment: resPaymentAllForDoctor.data
            })
        }
        this.setState({
            currentDate: date,

        })

    }
    handleOnclickConfirm = (item) => {

        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            patientName: item.patientData.firstName,
            email: item.patientData.email,
            timeType: item.timeType,
        }
        this.setState({
            isOpenModal: true,
            dataModal: data,
        })
    }
    closeRemedyModal = () => {
        this.setState({
            isOpenModal: false,
            dataModal: {}
        })
    }
    sendRemedy = async (dataFromModal) => {
        this.setState({
            iShowLoading: true
        })
        const data = {
            doctorId: dataFromModal.doctorId,
            patientId: dataFromModal.patientId,
            patientName: dataFromModal.patientName,
            email: dataFromModal.email,
            timeType: dataFromModal.timeType,
            imageBase64: dataFromModal.imageBase64,
            language: this.props.language
        }
        const response = await userService.sendRemedy(data)
        if (response && response.errCode === 0) {
            toast.success("Send remedy success")

        }
        else {
            toast.success("Send remedy fail")
        }
        this.setState({
            iShowLoading: false
        })
        this.closeRemedyModal()
        let resPaymentAllForDoctor = await userService.getAllPatientForDoctor({
            doctorId: this.props.userInfo.id,
            date: this.state.currentDate.getTime()
        })

        if (resPaymentAllForDoctor && resPaymentAllForDoctor.errCode === 0) {

            this.setState({
                listPayment: resPaymentAllForDoctor.data
            })
        }
    }
    render() {
        const { listPayment, isOpenModal, dataModal, iShowLoading } = this.state
        const { language } = this.props
        return (

            <LoadingOverlay
                active={iShowLoading}
                spinner
                text='Loading...'
            >
                <div className="manage-patient">
                    <div className="manage-patient-container container">
                        <div className="row">
                            <div className="col-12">
                                <div className="manage-patient-title"> Hello world form manage patient</div>
                            </div>
                        </div>
                        <div className="row manage-patient-body">
                            <div className="col-4 form-group">
                                <label>Chọn Ngày Khám</label>
                                <DatePicker className="form-control"
                                    onChange={(date) => { this.handleDatePickerChange(date) }}
                                    selected={this.state.currentDate}
                                    dateFormat="dd/MM/yyyy"
                                    locale="vi"
                                />
                            </div>
                            <div className="col-12 form-group">
                                <table id="tableManageUser" className="mb-5">
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Name</th>
                                            <th>Address</th>
                                            <th>Phone</th>
                                            <th>Gender</th>
                                            <th>Time</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listPayment && listPayment.map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.patientData && item.patientData.email ? item.patientData.email : ''}</td>
                                                    <td>{item.patientData && item.patientData.firstName ? item.patientData.firstName : ''}</td>
                                                    <td>{item.patientData && item.patientData.address ? item.patientData.address : ''}</td>
                                                    <td>{item.patientData && item.patientData.phoneNumber ? item.patientData.phoneNumber : ''}</td>
                                                    <td>{item.patientData && item.patientData.genderData ? (language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn) : ''}</td>
                                                    <td>{item.bookingTypeData ? (language === LANGUAGES.VI ? item.bookingTypeData.valueVi : item.bookingTypeData.valueEn) : ''}</td>
                                                    <td>

                                                        <button
                                                            className="btn btn-primary  "
                                                            onClick={() => this.handleOnclickConfirm(item)}
                                                        >
                                                            <i className="far fa-check-circle mr-2"></i>Xác Nhận
                                                        </button >

                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                    <RemadyModal
                        isOpen={isOpenModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />

                </div >
            </LoadingOverlay>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule)
