import React, { Component } from 'react'
import { connect } from "react-redux"

import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils/constant'
import { userService } from '../../../services/userService'

import { FormattedMessage } from 'react-intl'
import Select from 'react-select'
// import DatePicker from '../../../components/Input/DatePicker'
import { toast } from 'react-toastify';
import moment from 'moment'
import _ from 'lodash';
// import Flatpickr from "react-flatpickr";
import DatePicker, { registerLocale } from "react-datepicker";
import VI from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";

import './ManageSchedule.scss'


class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: '',
            doctors: [],
            currentDate: new Date(new Date().setHours(0, 0, 0, 0)),
            rangeTime: [],
            dataRangeTime: []
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.fetchAllScheduleTime()
        registerLocale("vi", VI)

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            const dataSelector = this.buildDataInputSelect(this.props.allDoctorsRedux)
            this.setState({
                doctors: dataSelector,
            })
        }
        if (prevProps.language !== this.props.language) {
            const dataSelector = this.buildDataInputSelect(this.props.allDoctorsRedux)

            this.setState({
                doctors: dataSelector,
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = _.cloneDeep(this.props.allScheduleTime)
            if (data && data.length > 0) {
                data = data.map((item) => {
                    item.isSelected = false;
                    return item
                })
            }
            this.setState({
                rangeTime: data,
                dataRangeTime: _.cloneDeep(data),
            })
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
    handleSelectChange = async (selectedOption) => {
        this.setState({
            selectedDoctor: selectedOption,

        })

    }
    handleDatePickerChange = (date) => {

        this.setState({
            currentDate: date,
        })
    }
    handleClickBtnTime = (item) => {
        const rangeTime = this.state.rangeTime
        const index = rangeTime.indexOf(item)
        if (index !== -1) {
            rangeTime[index].isSelected = !rangeTime[index].isSelected
        }
        this.setState({
            rangeTime: rangeTime,
        })
    }
    handleSaveSchedule = async () => {
        const { rangeTime, selectedDoctor, currentDate } = this.state
        let result = [];
        console.log(typeof (currentDate))
        if (!currentDate) {
            toast.error("Invalid date");
            return
        }
        if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selected doctor");
            return
        }
        let selectedTime;
        if (rangeTime && rangeTime.length > 0) {
            selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {

                selectedTime.map((item) => {
                    const obj = {}
                    obj.doctorId = selectedDoctor.value
                    obj.date = currentDate.getTime()
                    obj.timeType = item.keyMap
                    return result.push(obj)
                })
            }
            else {
                toast.error("Invalid selected time");
                return;
            }
        }
        const res = await userService.postBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: currentDate
        })
        if (res && res.errCode === 0) {
            toast.success("Lưu Thông Tin Thành Công");
        }
        else {
            toast.error("Thất Bại");
        }
        this.setState({
            selectedDoctor: '',
            currentDate: new Date(new Date().setHours(0, 0, 0, 0)),
            rangeTime: _.cloneDeep(this.state.dataRangeTime),
        })

    }
    render() {
        console.log(this.state.currentDate.getTime())
        const { rangeTime } = this.state
        const { language } = this.props
        return (
            <div className="manage-schedule">
                <div className="manage-schedule-container container">
                    <div className="manage-schedule-content row">

                        <div className="manage-schedule-title col-12">
                            <FormattedMessage id="manage-schedule.title" />
                        </div>
                        <div className="col-6 my-3">
                            <label>
                                <FormattedMessage id="manage-schedule.choose-doctor" />
                            </label>
                            <Select
                                value={this.state.selectedDoctor}
                                options={this.state.doctors}
                                onChange={(selectedOption) => { this.handleSelectChange(selectedOption) }}
                            />
                        </div>
                        <div className="col-6 my-3">
                            <label>
                                <FormattedMessage id="manage-schedule.choose-date" />
                            </label>
                            <DatePicker className="form-control"
                                onChange={(date) => { this.handleDatePickerChange(date) }}
                                selected={this.state.currentDate}
                                minDate={new Date()}
                                dateFormat="dd/MM/yyyy"
                                locale="vi"
                            />
                        </div>
                        <div className="col-12 pick-hour-container my-3">
                            <div className="group-btn-schedule ">

                                {rangeTime && rangeTime.length > 0 &&
                                    rangeTime.map((item) => {
                                        return (

                                            <button
                                                className={item.isSelected ? 'btn btn-schedule btn-primary' : 'btn btn-schedule'}
                                                key={item.id}
                                                onClick={() => { this.handleClickBtnTime(item) }}
                                            >
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-12 ">
                            <button
                                className="btn btn-primary w-100"
                                onClick={() => { this.handleSaveSchedule() }}
                            >
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        allDoctorsRedux: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule)
