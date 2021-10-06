import React, { Component } from 'react';
import { connect } from "react-redux"
import { LANGUAGES } from '../../utils/constant'
import { userService } from '../../services/userService'
import './VerifyEmail.scss'
import HomeHeader from '../HomePage/HomeHeader';
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: ''
        }
    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search) {

            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get('token');
            const doctorId = urlParams.get('doctorId');
            let res = await userService.postVerifytBookAppointment({
                token: token,
                doctorId: doctorId,
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            }
            else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }

    componentDidUpdate() {

    }
    render() {
        let { statusVerify, errCode } = this.state
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                {
                    statusVerify ?
                        (<div className="verify">
                            {
                                errCode === 0 ?
                                    (<div className="success">
                                        Xác nhận lịch hẹn thành công
                                    </div>)
                                    :
                                    (<div className="fail">
                                        Lịch hẹn không tồn tại hoặc đã được xác nhận
                                    </div>)
                            }
                        </div>) :
                        (<div>
                            Loading data...
                        </div>)


                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
