import React, { Component } from 'react'
import { connect } from "react-redux"

import { LANGUAGES } from '../../../utils/constant'
import './RemedyModal.scss'
import { FormattedMessage } from 'react-intl';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { userService } from '../../../services/userService';
import { toast } from 'react-toastify'
import CommonUtils from '../../../utils/CommonUtils';

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imageBase64: '',
            doctorId: '',
            patientId: '',
            timeType: '',
        }
    }
    async componentDidMount() {

        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
                doctorId: this.props.dataModal.doctorId,
                patientId: this.props.dataModal.patientId,
                patientname: this.props.dataModal.patientName,
                timeType: this.props.dataModal.timeType,

            })
        }

    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.dataModal !== prevProps.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
                doctorId: this.props.dataModal.doctorId,
                patientId: this.props.dataModal.patientId,
                timeType: this.props.dataModal.timeType,
                patientName: this.props.dataModal.patientName,
            })
        }
    }
    handleOnchangeEmail = (event) => {
        const email = event.target.value;
        this.setState({
            email: email
        })
    }
    handleOnchangeImage = async (event) => {
        const file = event.target.files[0]
        if (file) {

            const base64 = await CommonUtils.getBase64(file)

            this.setState({
                imageBase64: base64,
            })

        }
    }
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }
    render() {
        const { isOpen, dataModal, closeRemedyModal, sendRemedy } = this.props
        const { email, imageBase64 } = this.state
        return (

            <Modal
                size="lg"
                centered={true}
                isOpen={isOpen}>
                <ModalHeader toggle={closeRemedyModal}>Gửi Kết Quả Khám Bệnh</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <div className="form-group">
                                <label>Email Bệnh Nhân</label>
                                <input className="form-control" type="email" value={email}
                                    onChange={(event) => { this.handleOnchangeEmail(event) }}
                                />
                            </div>
                        </div>
                        <div className="col-6 form-group">
                            <div className="form-group">
                                <label>Chọn File Kết Quả</label>
                                <input
                                    className="form-control-file"
                                    type="file"
                                    onChange={(event) => { this.handleOnchangeImage(event) }} />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { this.handleSendRemedy() }}>Send</Button>{' '}
                    <Button color="secondary" onClick={closeRemedyModal}>Cancel</Button>
                </ModalFooter>
            </Modal >

        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal)
