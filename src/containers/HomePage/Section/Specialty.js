import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLanguageApp } from '../../../store/actions';
import Slider from "react-slick";
import './Specialty.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { userService } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }
    async componentDidMount() {
        let res = await userService.getAllSpecialty()
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }
    render() {
        const settings = this.props.settings;
        let { dataSpecialty } = this.state;
        return (
            <section className="section-share section-specialty" >
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-title"><FormattedMessage id="home-page.specialty-poplular" /></span>
                        <button className="section-btn"><FormattedMessage id="home-page.see-more" /></button>
                    </div>
                    <div className="section-body">
                        <Slider {...settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item) => {
                                    return (

                                        <div className="section-customize" key={item.id}>
                                            <div className="section-customize-container">
                                                <div className="bg-image" style={{ backgroundImage: `url(${item.image})` }} ></div>
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
