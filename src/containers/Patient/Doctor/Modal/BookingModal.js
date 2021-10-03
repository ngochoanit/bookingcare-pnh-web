import React, { Component } from 'react'
import { connect } from "react-redux"

import { LANGUAGES } from '../../../../utils/constant'
import './BookingModal.scss'
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import NumberFormat from 'react-number-format';
import ProfileDoctor from '../ProfileDoctor';
import Select from 'react-select'
import DatePicker, { registerLocale } from "react-datepicker";
import VI from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";
import * as actions from '../../../../store/actions'
import { userService } from '../../../../services/userService';
import { toast } from 'react-toastify'

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            phoneNumber: '',
            fullName: '',
            address: '',
            reason: '',
            birthday: '',
            gender: '',
            doctorId: '',
            timeType: '',
            genders: []

        }
    }
    componentDidMount() {
        this.props.fetchGender()
        registerLocale("vi", VI)
    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                ...this.setState,
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                ...this.setState,
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            this.setState({
                doctorId: this.props.doctorId
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            this.setState({
                timeType: this.props.dataTime.timeType
            })
        }

    }
    handleOnchangeInput = (event, id) => {
        const valueInput = event.target.value
        this.setState({
            ...this.state,
            [id]: valueInput
        })
    }
    handleDatePickerChange = (date) => {

        this.setState({
            birthday: date,
        })
    }
    buildDataGender = (data) => {
        let result = []
        let language = this.props.language
        if (data && data.length > 0) {
            data.map((item) => {
                let obj = {}
                obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                obj.value = item.keyMap
                return result.push(obj)
            })
        }
        return result
    }
    handleSelectChange = (selectOption) => {
        this.setState({
            gender: selectOption
        })
    }
    handleConfirmBooking = async () => {
        console.log(this.state)
        let res = await userService.postPatientBookAppointment({
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            fullName: this.state.fullName,
            address: this.state.address,
            reason: this.state.reason,
            date: this.state.birthday,
            gender: this.state.gender,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
        })
        if (res && res.errCode === 0) {
            toast.success("Booking a new appointment successed");
            console.log(res)
            this.setState({
                email: '',
                phoneNumber: '',
                fullName: '',
                address: '',
                reason: '',
                birthday: '',
                gender: '',
            })
            this.props.closeBookingModal()
        }
        else {
            toast.error("Booking a new appointment failed");
        }
    }
    render() {
        const { isOpen, closeBookingModal, dataTime, doctorId } = this.props;
        const { email, phoneNumber, fullName, address, reason, genders, gender, birthday } = this.state

        return (
            <Modal
                size="lg"
                centered={true}
                isOpen={isOpen}>
                <div className="booking-modal-container container">
                    <div className="row">
                        <div className="col-12 booking-modal-header">
                            <span className="booking-modal-header-left">
                                <FormattedMessage id="patient.booking-modal.title" />
                            </span>
                            <span
                                className="booking-modal-header-right"
                                onClick={closeBookingModal}
                            >
                                <i className="fas fa-times"></i>
                            </span>
                        </div>
                        <div className="col-12 booking-modal-body">
                            <div className="row">
                                <div className="col-12 booking-modal-body-doctor-infor">
                                    <ProfileDoctor
                                        doctorId={doctorId}
                                        isShowDescription={false}
                                        dataTime={dataTime}
                                    />
                                </div>

                                <div className="col-12 booking-modal-body-form">
                                    <div className="row">
                                        <div className="col-6 form-group">
                                            <label> <FormattedMessage id="patient.booking-modal.fullname" /></label>
                                            <input
                                                type="text" className="form-control"
                                                value={fullName}
                                                onChange={(event) => { this.handleOnchangeInput(event, 'fullName') }}
                                            />
                                        </div>
                                        <div className="col-6 form-group">
                                            <label> <FormattedMessage id="patient.booking-modal.phonenumber" /></label>
                                            <NumberFormat
                                                className="form-control"
                                                format="####.###.###"
                                                placeholder="0123.456.789"
                                                value={phoneNumber}
                                                onChange={(event) => { this.handleOnchangeInput(event, 'phoneNumber') }}
                                            />
                                        </div>
                                        <div className="col-6 form-group">
                                            <label>Email</label>
                                            <input
                                                type="text" className="form-control"
                                                value={email}
                                                onChange={(event) => { this.handleOnchangeInput(event, 'email') }}
                                                placeholder="abcxyz@gmail.com"
                                            />
                                        </div>
                                        <div className="col-6 form-group">
                                            <label> <FormattedMessage id="patient.booking-modal.address" /></label>
                                            <input
                                                type="text" className="form-control"
                                                value={address}
                                                onChange={(event) => { this.handleOnchangeInput(event, 'address') }}
                                            />
                                        </div>
                                        <div className="col-6 form-group">
                                            <label> <FormattedMessage id="patient.booking-modal.gender" /></label>
                                            <Select
                                                value={gender}
                                                options={genders}
                                                onChange={(selectedOption) => { this.handleSelectChange(selectedOption) }}
                                            />
                                        </div>
                                        <div className="col-6 form-group">
                                            <label> <FormattedMessage id="patient.booking-modal.birthday" /></label>
                                            <DatePicker
                                                className="form-control"
                                                onChange={(date) => { this.handleDatePickerChange(date) }}
                                                dateFormat="dd/MM/yyyy"
                                                locale="vi"
                                                placeholderText="dd/MM/yyyy"
                                                selected={birthday}
                                            />
                                        </div>
                                        <div className="col-12 form-group">
                                            <label> <FormattedMessage id="patient.booking-modal.reason" /></label>
                                            <textarea
                                                className="form-control"
                                                value={reason}
                                                onChange={(event) => { this.handleOnchangeInput(event, 'reason') }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* {JSON.stringify(dataTime)} */}
                        </div>
                        <div className="col-12 booking-modal-footer">
                            <div className="booking-modal-footer-btn">
                                <button
                                    className="booking-modal-footer-btn-item booking-modal-footer-btn-item-confirm "
                                    onClick={() => { this.handleConfirmBooking() }}
                                >
                                    <FormattedMessage id="patient.booking-modal.confirm" />
                                </button>
                                <button
                                    className="booking-modal-footer-btn-item booking-modal-footer-btn-item-cancel "
                                    onClick={closeBookingModal} >
                                    <FormattedMessage id="patient.booking-modal.cancel" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal >
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchGender: () => dispatch(actions.fetchGenderStart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal)
