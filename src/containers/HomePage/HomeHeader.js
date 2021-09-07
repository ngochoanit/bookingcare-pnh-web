import React, { Component } from 'react';
import { connect } from 'react-redux';

import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl'

class HomeHeader extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div className="header-logo"></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.specialist" /></b></div>
                                <div className="sub-title"><FormattedMessage id="home-header.search-docter" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.health-facility" /></b></div>
                                <div className="sub-title"><FormattedMessage id="home-header.select-room" /></div>
                            </div><div className="child-content">
                                <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                                <div className="sub-title"><FormattedMessage id="home-header.select-doctor" /></div>
                            </div><div className="child-content">
                                <div><b><FormattedMessage id="home-header.fee" /></b></div>
                                <div className="sub-title"><FormattedMessage id="home-header.check-health" /></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support"><i className="far fa-question-circle"></i><FormattedMessage id="home-header.support" /></div>
                            <div className="language-vi">VN</div>
                            <div className="language-en">EN</div>
                        </div>
                    </div>
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1">Nền Tảng Sức Khỏe</div>
                            <div className="title2">Chăm sóc sức khỏe toàn diện</div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder="Tìm Chuyên Khoa Khám Bệnh" />
                            </div>
                        </div>
                        <div className="content-down">
                            <div className="options">
                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-hospital-alt"></i></div>
                                    <div className="text-child">Khám Chuyên Khoa</div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-mobile-alt"></i></div>
                                    <div className="text-child">Khám Từ Xa</div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-stethoscope"></i></div>
                                    <div className="text-child">Khám Tổng Quát</div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-file-medical-alt"></i></div>
                                    <div className="text-child">Xét Nghiệm Y Học</div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="far fa-heart"></i></div>
                                    <div className="text-child">Sức Khỏe Tinh Thần</div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i class="fas fa-user-md"></i></div>
                                    <div className="text-child">Khám Nha Khoa</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
