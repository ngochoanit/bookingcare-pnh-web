import React, { Component } from 'react'
import { connect } from "react-redux"

import moment from "moment"
import vi from 'moment/locale/vi';
import en from 'moment/locale/en-au';

import { userService } from '../../../services/userService'

import { LANGUAGES } from '../../../utils/constant'
import './DoctorSchedule.scss'
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal'
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvaliableTime: [],
            selectedDate: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
            isOpenBookingModal: false,
            dataScheduleTimeModal: {}
        }
    }
    async componentDidMount() {
        this.setArrDays()
    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
            this.setArrDays()
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            this.setArrDays()
        }
    }
    setArrDays = async () => {
        const { language } = this.props
        const arrDate = []
        for (let i = 0; i < 7; i++) {
            let obj = {}
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).add(i, "days").locale('vi', vi).format('DD/MM')
                    let today = `Hôm nay - ${ddMM}`
                    obj.label = today
                }
                else {

                    obj.label = this.capitalizeFirstLetter(moment(new Date()).add(i, "days").locale('vi', vi).format('dddd - DD/MM'))
                }
            }
            else {
                if (i === 0) {
                    let ddMM = moment(new Date()).add(i, "days").locale('en', en).format('DD/MM')
                    let today = `Today - ${ddMM}`
                    obj.label = today
                }
                else {

                    obj.label = moment(new Date()).add(i, "days").locale('en', en).format('ddd - DD/MM')
                }
            }
            obj.value = moment(new Date()).add(i, "days").startOf('day').valueOf()
            arrDate.push(obj)
        }
        let res = await userService.getScheduleDoctorByDate(this.props.doctorId, this.state.selectedDate)
        let allAvaliableTime;

        if (res && res.errCode === 0) {
            allAvaliableTime = res.data
        }
        this.setState({
            allDays: arrDate,
            allAvaliableTime: allAvaliableTime
        })
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    handleOnchangeSelect = async (event) => {
        let res = await userService.getScheduleDoctorByDate(this.props.doctorId, event.target.value)
        let allAvaliableTime;

        if (res && res.errCode === 0) {
            allAvaliableTime = res.data
        }
        this.setState({
            allAvaliableTime: allAvaliableTime,
            selectedDate: event.target.value,
        })
    }
    handleClickScheduleTime = (item) => {
        this.setState({
            isOpenBookingModal: true,
            dataScheduleTimeModal: item
        })
    }
    closeBookingModal = () => {
        this.setState({
            isOpenBookingModal: false
        })
    }
    render() {
        const { allDays, allAvaliableTime, dataScheduleTimeModal, isOpenBookingModal } = this.state
        const { language, doctorId } = this.props

        return (
            <React.Fragment>
                <div className="doctor-schedule-container row">
                    <div className="all-schedule col-12">
                        <select onChange={(event) => this.handleOnchangeSelect(event)}>
                            {
                                allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            value={item.value}
                                            key={index}>
                                            {item.label}
                                        </option>
                                    )
                                })
                            }

                        </select>
                    </div>
                    <div className="all-available-time col-12">
                        <div className="text-calender">
                            <span>
                                <i className="fa fa-calendar-alt"></i>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>
                        </div>
                        <div className="time-content">
                            {
                                allAvaliableTime && allAvaliableTime.length > 0 ?
                                    (<div className="time-content-btn-group">
                                        {
                                            allAvaliableTime.map((item) => {
                                                let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                                return (

                                                    <button
                                                        key={item.id}
                                                        className="btn"
                                                        onClick={() => this.handleClickScheduleTime(item)}
                                                    >
                                                        {timeDisplay}
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>)
                                    : (<span> <FormattedMessage id="patient.detail-doctor.no-schedule" /></span>)
                            }
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpen={isOpenBookingModal}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={dataScheduleTimeModal}
                    doctorId={doctorId}
                />
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule)
