import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss'
class HomeFooter extends Component {

    render() {
        return (
            <section className="home-footer" >
                <p>&copy; 2021 BookingCare Clone. More Information, please contact <a target="_blank" without rel="noreferrer" href='https://www.facebook.com/pnh.it/'>Phạm Ngọc Hoàn</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
