import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import './HandBook.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class HandBook extends Component {

    render() {
        const settings = { ...this.props.settings, slidesToShow: 2 };

        return (
            <section className="section-share section-hand-book" >
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-title">Cẩm Nang</span>
                        <button className="section-btn">Xem Thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...settings}>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">8 Bác sĩ, Chuyên gia khám, tư vấn Stress từ xa (online) giỏi</div>
                                </div>

                            </div>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">8 Bác sĩ, Chuyên gia khám, tư vấn Stress từ xa (online) giỏi</div>
                                </div>

                            </div>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">8 Bác sĩ, Chuyên gia khám, tư vấn Stress từ xa (online) giỏi</div>
                                </div>

                            </div>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">8 Bác sĩ, Chuyên gia khám, tư vấn Stress từ xa (online) giỏi</div>
                                </div>

                            </div>
                            <div className="section-customize">
                                <div className="section-customize-container">
                                    <div className="bg-image"  ></div>
                                    <div className="section-customize-title">8 Bác sĩ, Chuyên gia khám, tư vấn Stress từ xa (online) giỏi</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
