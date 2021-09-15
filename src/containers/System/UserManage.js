import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userService } from '../../services/userService'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter'
import './userManage.scss'
class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }
    async componentDidMount() {
        await this.getAllUsers()
    }
    //handle add new user
    handleAddNewUser = () => {
        this.toggleUserModal()
    }
    //handle toggle user modal
    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    // handle create new user
    createNewUser = async (data) => {
        try {
            let response = await userService.createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            }
            else {
                await this.getAllUsers()
                this.setState({
                    isOpenModal: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        }
        catch (err) {
            console.log(err)
        }

    }
    //handle get all users
    getAllUsers = async () => {
        const response = await userService.getAllUsersService('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                ...this.state,
                arrUsers: response.users
            })
        }
    }
    //handle delete user
    handleDeleteUser = async (user) => {
        try {
            const response = await userService.deleteUserService(user.id)
            if (response && response.errCode === 0) {
                await this.getAllUsers()
            }
            else {
                alert(response.errMessage)
            }
        } catch (err) {
            console.log(err)
        }
    }
    //handle onclick btn edit user
    handleOnClickEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }
    //handle edit user
    editUser = async (user) => {
        try {
            const response = await userService.editUser(user)
            if (response && response.errCode === 0) {
                await this.getAllUsers()
                this.setState({
                    isOpenModalEditUser: false,
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    //handle toggle user modal edit user
    toggleUserModalEditUser = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }
    render() {
        const arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    toggle={this.toggleUserModal}
                    createNewUser={this.state.userEdit}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggle={this.toggleUserModalEditUser}
                        currentUser={this.state.userEdit}
                        editUser={this.editUser}
                    />}
                <div className="title"> Manage users with Ngọc Hoàn</div>
                <div className="mx-1">
                    <button className="btn btn-primary btn-add"
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
                <div className="user-table mt-3 mx-1">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrUsers && arrUsers.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.email}</td>
                                        <td>{`${user.firstName} ${user.lastName}`}</td>
                                        <td>{user.address}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-edit"
                                                onClick={() => this.handleOnClickEditUser(user)}
                                            >
                                                <i className="far fa-edit"></i></button >
                                            <button
                                                className="btn btn-danger btn-delete"
                                                onClick={() => this.handleDeleteUser(user)}
                                            >
                                                <i className="far fa-trash-alt"></i>
                                            </button >
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
