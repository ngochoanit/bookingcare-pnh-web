import React, { Component } from 'react';
import { connect } from "react-redux";
import { userService } from '../../../services/userService'
import { LANGUAGES } from '../../../utils/constant'

import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import DoctorSchedule from './DoctorSchedule'
import DoctorExtraInfor from './DoctorExtraInfor';

import './DetailDoctor.scss'
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {}
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const res = await userService.getDetailInforDoctor(this.props.match.params.id)
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }

    componentDidUpdate() {

    }
    render() {
        const { detailDoctor } = this.state
        const { language } = this.props
        let nameVi, nameEn
        if (detailDoctor && detailDoctor.positionData) {

            nameVi = `${detailDoctor.positionData.valueVi} ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn} ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="infor-doctor container">
                        <div className="row">
                            <div className="infor-doctor-content-left col-2">
                                <div className="infor-doctor-content-left-avatar"
                                    style={{ backgroundImage: `url(${detailDoctor.image ? detailDoctor.image : ''}` }}
                                ></div>
                            </div>
                            <div className="infor-doctor-content-right col-10">
                                <div className="infor-doctor-content-right-top">
                                    {language === LANGUAGES.VI ? nameVi : nameEn}
                                </div>
                                <div className="infor-doctor-content-right-bottom">
                                    {detailDoctor.Markdown && <span>
                                        {detailDoctor.Markdown.description}
                                    </span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="schedule-doctor-container container">
                            <div className="row">
                                <div className="schedule-doctor-content-left col-6">
                                    <DoctorSchedule doctorId={this.state.detailDoctor.id} />

                                </div>
                                <div className="schedule-doctor-content-right col-6">
                                    <DoctorExtraInfor doctorId={this.state.detailDoctor.id}></DoctorExtraInfor>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="detail-infor-doctor">
                        <div className="detail-infor-doctor-container container">
                            <div className="row">
                                <div className="detail-infor-doctor-content col-12">
                                </div>
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                                    <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>}
                            </div>
                        </div>
                    </div>
                    <div className="comment_doctor"></div>
                </div>
                <HomeFooter />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
