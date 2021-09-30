import React, { Component } from 'react'
import { connect } from "react-redux"

import { LANGUAGES } from '../../../../utils/constant'
import './BookingModal.scss'
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NumberFormat from 'react-number-format';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState) {

    }
    render() {
        const { isOpen, closeBookingModal, dataTime } = this.props;
        return (
            <Modal
                size="lg"
                centered={true}
                isOpen={isOpen}>
                <div className="booking-modal-container container">
                    <div className="row">
                        <div className="col-12 booking-modal-header">
                            <span className="booking-modal-header-left">
                                Thông Tin Đặt Lịch Khám Bệnh
                            </span>
                            <span
                                className="booking-modal-header-right"
                                onClick={closeBookingModal}
                            >
                                <i className="fas fa-times"></i>
                            </span>
                        </div>
                        <div className="col-12 booking-modal-body">
                            <div className="row">
                                <div className="col-12 booking-modal-body-doctor-infor">

                                </div>
                                <div className="col-12 booking-modal-body-price">
                                    Giá Khám: 500.000VND
                                </div>
                                <div className="col-12 booking-modal-body-form">
                                    <div className="row">
                                        <div className="col-6 form-group">
                                            <label>Họ Tên</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="col-6 form-group">
                                            <label>Số Điện Thoại</label>
                                            <NumberFormat
                                                className="form-control" format=" ####.###.###"
                                                placeholder="0123.456.789"
                                            />
                                        </div>
                                        <div className="col-6 form-group">
                                            <label>Email</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="col-6 form-group">
                                            <label>Địa Chỉ Liên Hệ</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="col-6 form-group">
                                            <label>Giới Tính</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="col-6 form-group">
                                            <label>Đặt Cho Ai</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="col-12 form-group">
                                            <label>Lý Do Khám</label>
                                            <textarea className="form-control"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* {JSON.stringify(dataTime)} */}
                        </div>
                        <div className="col-12 booking-modal-footer">
                            <div className="booking-modal-footer-btn">
                                <button
                                    className="booking-modal-footer-btn-item booking-modal-footer-btn-item-confirm " >
                                    Xác Nhận
                                </button>
                                <button
                                    className="booking-modal-footer-btn-item booking-modal-footer-btn-item-cancel "
                                    onClick={closeBookingModal} >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal)
