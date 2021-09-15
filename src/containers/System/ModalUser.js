import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
        this.listenToEmitter();
    }
    listenToEmitter = () => {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })
    }
    componentDidMount() {
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
    handleAddNewUser = () => {
        const isValid = this.checkValidateInput();
        if (isValid) {
            //call API
            this.props.createNewUser(this.state)
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
                <ModalHeader toggle={() => toggle()}>Create new user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type='text'
                                onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type='password'
                                onChange={(event) => this.handleOnchangeInput(event, 'password')}
                                value={this.state.password}
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
                    <Button className="px-3" color="primary" onClick={() => this.handleAddNewUser()}>Create New</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


