import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { withRouter } from 'react-router-dom';
import { userService } from '../../../services/userService'
import './MedicalFacility.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {

            dataClinics: []
        }

    }
    async componentDidMount() {
        const resClinic = await userService.getAllClinic()
        if (resClinic && resClinic.errCode === 0 && resClinic.data) {
            this.setState({
                dataClinics: resClinic.data
            })
        }
    }
    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {

            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }
    render() {
        const { dataClinics } = this.state
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
                            {
                                dataClinics && dataClinics.length > 0 && dataClinics.map((item) => {
                                    return (<div
                                        className="section-customize"
                                        key={item.id}
                                        onClick={() => { this.handleViewDetailClinic(item) }}
                                    >
                                        <div className="section-customize-container">
                                            <div className="bg-image" style={{ backgroundImage: `url(${item.image})` }}  ></div>
                                            <div className="section-customize-title">{item.name}</div>
                                        </div>

                                    </div>)
                                })
                            }

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
