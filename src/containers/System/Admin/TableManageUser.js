import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions'

import './TableManageUser.scss'
class TableManageUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usersRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchUsersRedux()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.usersRedux !== this.props.usersRedux) {
            this.setState({
                usersRedux: this.props.usersRedux
            })
        }
    }
    //handle delete user from
    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id)
    }
    //handle edit user
    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user)
    }
    render() {
        const users = this.state.usersRedux

        return (
            <table id="tableManageUser" className="mb-5">
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
                        users && users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.email}</td>
                                <td>{`${user.firstName} ${user.lastName}`}</td>
                                <td>{user.address}</td>
                                <td>{user.phoneNumber}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-edit"
                                        onClick={() => this.handleEditUser(user)}
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

        );
    }

}

const mapStateToProps = state => {
    return {
        usersRedux: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
