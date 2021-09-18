import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant'
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../store/actions'

import './OutStandingDoctor.scss'
class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDocs: [],
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDocs: this.props.topDoctorsRedux
            })
        }
    }
    // handle onClick view detail doctor
    handleViewDetqailDoctor = (id) => {
        this.props.history.push(`/detail-doctor/${id}`)
    }
    render() {
        const settings = this.props.settings;
        const arrDocs = this.state.arrDocs;
        const { language } = this.props
        return (
            <section className="section-share section-outstanding-doctor" >
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-title">
                            <FormattedMessage id="home-page.outstanding-doctor" />
                        </span>
                        <button className="section-btn">
                            <FormattedMessage id="home-page.more-infor" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...settings}>
                            {arrDocs && arrDocs.length > 0
                                && arrDocs.map((item) => {
                                    let imageBase64
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    const nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                    const nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                    return (
                                        <div
                                            className="section-customize"
                                            key={item.id}
                                            onClick={() => { this.handleViewDetqailDoctor(item.id) }}
                                        >
                                            <div className="section-customize-container">
                                                <div
                                                    className="bg-image"
                                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                                ></div>
                                                <div className="section-customize-title">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>
                </div>
            </section>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
