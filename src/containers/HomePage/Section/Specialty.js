import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLanguageApp } from '../../../store/actions';
import Slider from "react-slick";
import './Specialty.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {

    render() {
        const settings = this.props.settings;
        return (
            <section className="section-share section-specialty" >
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-title">Chuyên Khoa Phổ Biến</span>
                        <button className="section-btn">Xem Thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...settings}>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">Nội Soi Tiêu Hóa 1</div>
                                </div>

                            </div>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">Nội Soi Tiêu Hóa 1</div>
                                </div>

                            </div>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">Nội Soi Tiêu Hóa 1</div>
                                </div>

                            </div>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">Nội Soi Tiêu Hóa 1</div>
                                </div>

                            </div>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">Nội Soi Tiêu Hóa 1</div>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
