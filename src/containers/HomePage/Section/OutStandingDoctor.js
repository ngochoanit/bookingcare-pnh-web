import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import './OutStandingDoctor.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class OutStandingDoctor extends Component {

    render() {
        const settings = this.props.settings;
        return (
            <section className="section-share section-outstanding-doctor" >
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-title">Bác Sĩ Nổi Bật Tuần Qua</span>
                        <button className="section-btn">Xem Thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...settings}>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                                    <div className="section-customize-specialty">Nam Học</div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </section>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
