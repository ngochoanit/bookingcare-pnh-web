import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { userService } from '../../services/userService'
import './userManage.scss'
class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrUsers: []
        }
    }
    async componentDidMount() {
        const response = await userService.getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                ...this.state,
                arrUsers: response.users
            })
        }

    }
    render() {
        const arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <div className="title"> Manage users with Ngọc Hoàn</div>
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
                                            <button class="btn btn-warning btn-edit"><i class="far fa-edit"></i></button >
                                            <button class="btn btn-danger btn-delete"><i class="far fa-trash-alt"></i></button >
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
