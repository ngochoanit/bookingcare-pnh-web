import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import TableManageUser from './TableManageUser'

import { connect } from 'react-redux'
import * as actions from '../../../store/actions'

import { LANGUAGES, CRUD_ACTIONS } from '../../../utils/constant'
import CommonUtils from '../../../utils/CommonUtils'

import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

import avatarDefault from '../../../assets/avatar-doctor/avatar-default.jpg'

import './UserRedux.scss'
class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: "",

            isOpen: false,
            action: "",

            id: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            gender: "",
            positionId: "",
            roleId: "",
            image: "",

        }
    }
    async componentDidMount() {

        this.props.getGenerStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            const genderArr = this.props.genderRedux
            this.setState({
                genderArr: genderArr,
                gender: genderArr && genderArr.length > 0 ? genderArr[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            const positionArr = this.props.positionRedux

            this.setState({
                positionArr: positionArr,
                positionId: positionArr && positionArr.length > 0 ? positionArr[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            const roleArr = this.props.roleRedux
            this.setState({
                roleArr: this.props.roleRedux,
                roleId: roleArr && roleArr.length > 0 ? roleArr[0].keyMap : ""
            })
        }
        if (prevProps.usersRedux !== this.props.usersRedux) {
            const genderArr = this.props.genderRedux
            const positionArr = this.props.positionRedux
            const roleArr = this.props.roleRedux
            this.setState({
                id: "",
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                address: "",
                image: "",
                gender: genderArr && genderArr.length > 0 ? genderArr[0].keyMap : '',
                positionId: positionArr && positionArr.length > 0 ? positionArr[0].keyMap : '',
                roleId: roleArr && roleArr.length > 0 ? roleArr[0].keyMap : "",
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ""
            })
        }
    }
    //handle onchange image
    handleOnchangeImage = async (event) => {
        const file = event.target.files[0]
        if (file) {
            const base64 = await CommonUtils.getBase64(file)
            event.target.value = ""
            this.setState({
                previewImgURL: base64,
                image: base64
            })

        }
    }
    //handle on click preview image
    openPreviewImg = () => {
        if (this.state.previewImgURL) {
            this.setState({
                isOpen: true,
            })
        }
    }
    //handle save user
    handleSaveUser = () => {
        const isValid = this.checkValidateInput()
        const { action } = this.state
        if (!isValid) {
            return
        }

        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux action create new user
            this.props.createNewUser(
                {
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    phoneNumber: this.state.phoneNumber,
                    address: this.state.address,
                    gender: this.state.gender,
                    positionId: this.state.positionId,
                    roleId: this.state.roleId,
                    image: this.state.image
                }
            )
        }
        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux action edit user
            this.props.editUserRedux({
                id: this.state.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                gender: this.state.gender,
                positionId: this.state.positionId,
                roleId: this.state.roleId,
                image: this.state.image
            })
        }
    }
    //handle onchange input
    handleOnchangeInput = (event, id) => {
        const stateNew = { ...this.state }
        stateNew[id] = event.target.value
        this.setState({
            ...stateNew
        })
    }
    //handle validate input
    checkValidateInput = () => {
        let isValid = true
        const arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address', 'gender', 'positionId', 'roleId']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                alert(`Missing parameter is required ${arrCheck[i]}`)
                break
            }
        }
        return isValid

    }
    //handle edit usser form parent
    handleEditUserFromParent = (user) => {
        let imageBase64 = ""
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }
        this.setState({
            ...user,
            image: imageBase64,
            previewImgURL: imageBase64,
            password: "123456789",
            action: CRUD_ACTIONS.EDIT
        })
    }
    render() {
        const genders = this.state.genderArr
        const roles = this.state.roleArr
        const positions = this.state.positionArr
        const language = this.props.language
        const isLoadingGender = this.props.isLoadingGender

        const { email, password, firstName, lastName, phoneNumber, address } = this.state
        return (
            <div className="user-redux-container">
                <div className="user-redux-title text-primary">Manage User With Redux</div>

                <div className="user-redux-body" >
                    <div className="container">
                        <div className="row">
                            {/* <div className="col-12 my-3" ><FormattedMessage id="manage-user.add" /></div> */}
                            <div>{isLoadingGender === true ? `is loading genders` : ``}</div>
                            <div className="col-3">
                                <div className="row">
                                    <div className="col-12">
                                        <label >
                                            <FormattedMessage id="manage-user.image" />
                                        </label>
                                        <div className="preview-img-container">
                                            <input
                                                id="preview-image"
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                onChange={(event) => { this.handleOnchangeImage(event) }}
                                            />
                                            <label className="label-upload" htmlFor="preview-image"> Tải Ảnh<i className="fas fa-upload"></i></label>
                                            <div
                                                className="preview-image"
                                                style={{ backgroundImage: this.state.image ? `url(${this.state.previewImgURL})` : `url(${avatarDefault})` }}
                                                // style={this.state.image && { backgroundImage: `url(${this.state.previewImgURL})` }}{{}}
                                                onClick={() => { this.openPreviewImg() }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-9">
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <label >
                                            <FormattedMessage id="manage-user.email" />
                                        </label>
                                        <input
                                            className="form-control"
                                            type="email"
                                            value={email}
                                            onChange={(event) => { this.handleOnchangeInput(event, 'email') }}
                                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                        />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label >
                                            <FormattedMessage id="manage-user.password" />
                                        </label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            value={password}
                                            onChange={(event) => { this.handleOnchangeInput(event, 'password') }}
                                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                        />
                                    </div>

                                    <div className="col-6 mb-3">
                                        <label >
                                            <FormattedMessage id="manage-user.firstName" />
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={firstName}
                                            onChange={(event) => { this.handleOnchangeInput(event, 'firstName') }}
                                        />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label >
                                            <FormattedMessage id="manage-user.lastName" />
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={lastName}
                                            onChange={(event) => { this.handleOnchangeInput(event, 'lastName') }}
                                        />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label >
                                            <FormattedMessage id="manage-user.phoneNumber" />
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={phoneNumber}
                                            onChange={(event) => { this.handleOnchangeInput(event, 'phoneNumber') }}
                                        />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label >
                                            <FormattedMessage id="manage-user.address" />
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={address}
                                            onChange={(event) => { this.handleOnchangeInput(event, 'address') }}
                                        />
                                    </div>
                                    <div className="col-4 mb-3">
                                        <label >
                                            <FormattedMessage id="manage-user.gender" />
                                        </label>
                                        <select
                                            className="form-control"
                                            onChange={(event) => { this.handleOnchangeInput(event, 'gender') }}
                                            value={this.state.gender}
                                        >
                                            {genders && genders.length > 0
                                                && genders.map((item, index) => {
                                                    return (
                                                        <option
                                                            key={item.id}
                                                            value={item.keyMap}
                                                        >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="col-4 mb-3">
                                        <label >
                                            <FormattedMessage id="manage-user.position" />
                                        </label>
                                        <select
                                            className="form-control"
                                            onChange={(event) => { this.handleOnchangeInput(event, 'positionId') }}
                                            value={this.state.positionId}
                                        >
                                            {positions && positions.length > 0
                                                && positions.map((item, index) => {
                                                    return (
                                                        <option
                                                            key={item.id}
                                                            value={item.keyMap}
                                                        >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-4 mb-3">
                                        <label >
                                            <FormattedMessage id="manage-user.role" />
                                        </label>
                                        <select
                                            className="form-control"
                                            onChange={(event) => { this.handleOnchangeInput(event, 'roleId') }}
                                            value={this.state.roleId}
                                        >
                                            {roles && roles.length > 0
                                                && roles.map((item, index) => {
                                                    return (
                                                        <option
                                                            key={item.id}
                                                            value={item.keyMap}
                                                        >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-12 my-3 ">
                                        <button
                                            className={this.state.action === CRUD_ACTIONS.EDIT ? `btn btn-warning w-100 ` : `btn btn-primary w-100 `}
                                            onClick={() => this.handleSaveUser()}
                                        >
                                            {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit" /> : <FormattedMessage id="manage-user.save" />}

                                        </button>
                                    </div>
                                </div>
                            </div>


                            <div className="col-12">
                                <TableManageUser handleEditUserFromParent={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.isOpen === true && this.state.previewImgURL &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        usersRedux: state.admin.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getGenerStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUserRedux: (user) => dispatch(actions.editUser(user))
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux)
