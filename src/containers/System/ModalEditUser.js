import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalEditUserr extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: 'harcode',
            firstName: '',
            lastName: '',
            address: '',
        }

    }
    componentDidMount() {
        const user = this.props.currentUser;

        if (user && !_.isEmpty(user)) {
            this.setState({
                ...user
            })
        }
    }
    //handle onchangeInput
    handleOnchangeInput = (event, id) => {
        this.setState({
            ...this.state,
            [id]: event.target.value,
        })
    }
    // check validate input 
    checkValidateInput = () => {
        let isValid = true;
        const arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert(`Missing parameter: ${arrInput[i]}`)
                break;
            }
        }
        return isValid

    }
    //handle submit form
    handleSaveUser = () => {
        const isValid = this.checkValidateInput();
        if (isValid) {
            //call API
            this.props.editUser(this.state)
        }
    }
    render() {
        const { isOpen, toggle } = this.props;
        return (
            <Modal
                isOpen={isOpen}
                toggle={() => toggle()}
                className="modal-user-container"
                size="lg"
                centered
            >
                <ModalHeader toggle={() => toggle()}>Edit user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type='text'
                                onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type='password'
                                onChange={(event) => this.handleOnchangeInput(event, 'password')}
                                value={this.state.password}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label>First Name</label>
                            <input
                                type='text'
                                onChange={(event) => this.handleOnchangeInput(event, 'firstName')}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <label>Last Name</label>
                            <input
                                type='text'
                                onChange={(event) => this.handleOnchangeInput(event, 'lastName')}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input
                                type='text'
                                onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="px-3" color="primary" onClick={() => this.handleSaveUser()}>Save change</Button>{' '}
                    <Button className="px-3" color="secondary" onClick={() => toggle()}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUserr);


