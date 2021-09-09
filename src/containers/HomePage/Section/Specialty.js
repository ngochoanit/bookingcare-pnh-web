import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import { changeLanguageApp } from '../../../store/actions';
import Slider from "react-slick";
import './Specialty.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/specialty/Noi-soi-tieu-hoa.jpg"

class Specialty extends Component {

    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <section className="section-specialty" >
                <div className="specialty-container">
                    <div className="specialty-header">
                        <span className="specialty-title">Chuyên Khoa Phổ Biến</span>
                        <button className="specialty-btn">Xem Thêm</button>
                    </div>
                    <div className="specialty-body">
                        <Slider {...settings}>
                            <div className="specialty-customize">
                                <div className="specialty-customize-container">
                                    <div className="bg-image" src={specialtyImg} ></div>
                                    <div>Nội Soi Tiêu Hóa 1</div>
                                </div>

                            </div>
                            <div className="specialty-customize">
                                <div className="specialty-customize-container">
                                    <div className="bg-image" src={specialtyImg} ></div>
                                    <div>Nội Soi Tiêu Hóa 1</div>
                                </div>

                            </div>
                            <div className="specialty-customize">
                                <div className="specialty-customize-container">
                                    <div className="bg-image" src={specialtyImg} ></div>
                                    <div>Nội Soi Tiêu Hóa 1</div>
                                </div>

                            </div>
                            <div className="specialty-customize">
                                <div className="specialty-customize-container">
                                    <div className="bg-image" src={specialtyImg} ></div>
                                    <div>Nội Soi Tiêu Hóa 1</div>
                                </div>

                            </div>
                            <div className="specialty-customize">
                                <div className="specialty-customize-container">
                                    <div className="bg-image" src={specialtyImg} ></div>
                                    <div>Nội Soi Tiêu Hóa 1</div>
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
