import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss'
class About extends Component {

    render() {
        const settings = { ...this.props.settings, slidesToShow: 2 };

        return (
            <section className="section-share section-about" >
                <div className="section-container" >

                    <div className="section-about-header">Truyền Thông Nói Gì Về Chúng Tôi</div>
                    <div className="section-about-content">
                        <div className="section-about-content-left">
                            <iframe src="https://www.youtube.com/embed/2YllmPaKhkY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        <div className="section-about-content-right">
                            <p>"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."</p>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
