import React, { Component } from 'react'
import { connect } from "react-redux"

import { LANGUAGES } from '../../../utils/constant'
import './ProfileDoctor.scss'
import { userService } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import _ from 'lodash'
import moment from 'moment'
import NumberFormat from 'react-number-format';
import vi from 'moment/locale/vi';
import en from 'moment/locale/en-au';
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount() {
        const { doctorId } = this.props
        const data = await this.getInforDoctor(doctorId)
        this.setState({
            dataProfile: data
        })
    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.doctorId !== prevProps.doctorId) {
            const data = await this.getInforDoctor(this.props.doctorId)
            this.setState({
                dataProfile: data
            })
        }
    }
    getInforDoctor = async (id) => {
        let data = {}
        if (id) {
            const res = await userService.getProfileDoctor(id)

            if (res && res.errCode === 0) {
                data = res.data
            }
        }
        return data;
    }
    renderTimeBooking = (dataTime) => {
        const { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime) && dataTime.timeTypeData) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ? moment(new Date(dataTime.date)).locale('vi', vi).format('dddd - DD/MM/YYYY') : moment(new Date(dataTime.date)).locale('en', en).format('ddd - MM/DD/YYYY')
            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id="patient.profile.description" /></div>
                </>
            )
        }
        return <></>
    }
    render() {
        const { dataProfile } = this.state
        const { language, isShowDescription, dataTime } = this.props
        let nameVi = '', nameEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi} ${dataProfile.firstName} ${dataProfile.lastName}`
            nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.lastName} ${dataProfile.firstName}`
        }
        let priceVi = '', priceEn = ''
        if (dataProfile && dataProfile.Doctor_infor && dataProfile.Doctor_infor.priceTypeData) {
            priceVi = `${dataProfile.Doctor_infor.priceTypeData.valueVi}`
            priceEn = `${dataProfile.Doctor_infor.priceTypeData.valueEn} `
        }
        return (
            <div className="profile-doctor-container">
                <div
                    className="profile-doctor-avatar"
                    style={{ backgroundImage: `url(${dataProfile.image ? dataProfile.image : ''})` }}
                >
                </div>
                <div className="profile-doctor-infor">
                    <div className="profile-doctor-infor-name">
                        {language === LANGUAGES.VI ? nameVi : nameEn}
                    </div>
                    <div className="profile-doctor-infor-description">

                        {isShowDescription ?
                            <React.Fragment>
                                {dataProfile && dataProfile.Markdown ? dataProfile.Markdown.description : ""}
                            </React.Fragment>
                            :
                            <React.Fragment>
                                {this.renderTimeBooking(dataTime)}
                            </React.Fragment>
                        }
                    </div>
                    <div className="profile-doctor-infor-price">
                        <span className="profile-doctor-infor-price-title">
                            <FormattedMessage id="patient.profile.price" />
                        </span>
                        <span className="profile-doctor-infor-price-value">
                            <NumberFormat
                                value={language === LANGUAGES.VI ? priceVi : priceEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={language === LANGUAGES.VI ? 'VNĐ' : '$'} />
                        </span>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor)
