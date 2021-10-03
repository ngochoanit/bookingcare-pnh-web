import React, { Component } from 'react'
import { connect } from "react-redux"



import { userService } from '../../../services/userService'

import { LANGUAGES } from '../../../utils/constant'
import './DoctorExtraInfor.scss'
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format'
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }
    componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.doctorId !== prevProps.doctorId) {
            const res = await userService.getExtraInforDoctor(this.props.doctorId)
            if (res && res.errCode === 0) {
                this.setState({ extraInfor: res.data })
            }
        }
    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
        return
    }
    render() {
        const { isShowDetailInfor, extraInfor } = this.state
        const { language } = this.props

        return (
            <div className="doctor-extra-infor-container row">
                <div className="content-top col-12">
                    <div className="content-top-body">

                        <div className="content-top-text-address">
                            <FormattedMessage id="patient.extra-infor.text-address" />
                        </div>
                        <div className="content-top-text-name-clinic">
                            {
                                extraInfor ? extraInfor.nameClinic : ''
                            }
                        </div>
                        <div className="content-top-text-detail-address" > {
                            extraInfor ? extraInfor.addressClinic : ''
                        }
                        </div>
                    </div>
                </div>
                <div className="content-bottom col-12">
                    <div className="content-bottom-body">
                        {
                            isShowDetailInfor ?
                                (<div className="doctor-infor-price-detail">
                                    <div className="detail-price-title" >
                                        <FormattedMessage id="patient.extra-infor.text-price" />
                                    </div>
                                    <div className="detail-price-content">
                                        <div className="detail-price-content-top">
                                            <div className="detail-price-content-top-title">
                                                <span>
                                                    <FormattedMessage id="patient.extra-infor.text-price" />
                                                </span>
                                                <span>
                                                    {
                                                        extraInfor && extraInfor.priceTypeData ?
                                                            (
                                                                <NumberFormat
                                                                    value={language === LANGUAGES.VI ? extraInfor.priceTypeData.valueVi : extraInfor.priceTypeData.valueEn}
                                                                    displayType={'text'}
                                                                    thousandSeparator={true}
                                                                    suffix={language === LANGUAGES.VI ? "VND" : "$"} />)
                                                            : ''
                                                    }
                                                </span>
                                            </div>
                                            <div className="detail-price-content-top-note">
                                                <span>
                                                    {
                                                        extraInfor ? extraInfor.note : ''
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div className="detail-price-content-bottom">
                                            <span>
                                                <FormattedMessage id="patient.extra-infor.payment" />
                                                {
                                                    extraInfor && extraInfor.paymentTypeData ? (language === LANGUAGES.VI ?
                                                        extraInfor.paymentTypeData.valueVi : extraInfor.paymentTypeData.valueEn) : ""
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="detail-price-bottom" >
                                        <span className="show-hide-detail-infor"
                                            onClick={() => this.showHideDetailInfor(false)}
                                        >
                                            <FormattedMessage id="patient.extra-infor.hide-more" />
                                        </span>
                                    </div>
                                </div>) :
                                (<div className="doctor-infor-price">
                                    <span className="doctor-infor-price-title">
                                        <FormattedMessage id="patient.extra-infor.text-price" />:
                                    </span>
                                    <span className="doctor-infor-price-value">
                                        {
                                            extraInfor && extraInfor.priceTypeData ?
                                                (
                                                    <NumberFormat
                                                        value={language === LANGUAGES.VI ? extraInfor.priceTypeData.valueVi : extraInfor.priceTypeData.valueEn}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={language === LANGUAGES.VI ? "VND" : "$"} />)
                                                : ''
                                        }
                                    </span>
                                    <span className="show-hide-detail-infor"
                                        onClick={() => this.showHideDetailInfor(true)}
                                    >
                                        <FormattedMessage id="patient.extra-infor.show-more" />
                                    </span>
                                </div>)
                        }

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor)
