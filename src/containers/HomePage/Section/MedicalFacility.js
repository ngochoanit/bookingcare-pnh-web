import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import './MedicalFacility.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class MedicalFacility extends Component {

    render() {
        const settings = this.props.settings;
        return (
            <section className="section-share section-medical-facility" >
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-title">Cơ Sở Y Tế Nổi Bật</span>
                        <button className="section-btn">Xem Thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...settings}>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108</div>
                                </div>

                            </div>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108</div>
                                </div>

                            </div>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108</div>
                                </div>

                            </div>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108</div>
                                </div>

                            </div>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
