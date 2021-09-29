import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils/constant'
import { userService } from '../../../services/userService';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import _ from 'lodash'
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasOldData: false,
            doctors: [],
            selectedDoctor: '',
            contentMarkdown: '',
            contentHTML: '',
            description: '',

            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',

        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.getRequiredDoctorInfor()

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            const dataSelector = this.buildDataInputSelect(this.props.allDoctorsRedux, "USERS")
            this.setState({
                doctors: dataSelector,
            })
        }
        if (prevProps.language !== this.props.language) {
            let { selectedDoctor, selectedPrice, selectedPayment, selectedProvince } = this.state
            const dataSelector = this.props.allDoctorsRedux
            const { resPrice, resPayment, resProvince, } = this.props.allRequiredDoctorInfor
            const doctors = this.buildDataInputSelect(dataSelector, "USERS")
            const listPrice = this.buildDataInputSelect(resPrice, "PRICE")
            const listPayment = this.buildDataInputSelect(resPayment, "PAYMENT")
            const listProvince = this.buildDataInputSelect(resProvince, "PROVINCE")
            selectedDoctor = doctors.find((item) => { return (item.value === selectedDoctor.value) }) || ''
            selectedPrice = listPrice.find((item) => { return (item.value === selectedPrice.value) }) || ''
            selectedPayment = listPayment.find((item) => { return (item.value === selectedPayment.value) }) || ''
            selectedProvince = listProvince.find((item) => { return (item.value === selectedProvince.value) }) || ''
            this.setState({
                doctors: doctors,
                listPrice: listPrice,
                listPayment: listPayment,
                listProvince: listProvince,
                selectedDoctor: selectedDoctor,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            const dataSelector = this.props.allDoctorsRedux
            const { resPrice, resPayment, resProvince, } = this.props.allRequiredDoctorInfor
            this.setState({
                doctors: this.buildDataInputSelect(dataSelector, "USERS"),
                listPrice: this.buildDataInputSelect(resPrice, "PRICE"),
                listPayment: this.buildDataInputSelect(resPayment, "PAYMENT"),
                listProvince: this.buildDataInputSelect(resProvince, "PROVINCE")
            })
        }

    }
    buildDataInputSelect = (inputData, type) => {
        let result = []
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            if (type === "USERS") {
                inputData.map((item) => {
                    let obj = {}
                    let labelVi = `${item.lastName} ${item.firstName}`
                    let labelEn = `${item.firstName} ${item.lastName}`
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.id
                    return result.push(obj)
                })
            }
            if (type === "PRICE") {
                inputData.map((item) => {
                    let obj = {}
                    let labelVi = `${this.numberWithCommas(item.valueVi)} VND`
                    let labelEn = `${this.numberWithCommas(item.valueEn)} $`
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.keyMap
                    return result.push(obj)
                })
            }
            if (type === "PAYMENT" || type === "PROVINCE") {
                inputData.map((item) => {
                    let obj = {}
                    let labelVi = item.valueVi
                    let labelEn = item.valueEn
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.keyMap
                    return result.push(obj)
                })
            }
        }
        return result
    }
    //hendle onchange editor
    handleEditorChange({ html, text }) {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    //handle save info doctor
    handleSaveContentMarkdown = async () => {
        const {
            contentHTML,
            contentMarkdown,
            description,
            selectedDoctor,
            hasOldData,


            selectedPrice,
            selectedPayment,
            selectedProvince,
            nameClinic,
            addressClinic,
            note,
        } = this.state

        await this.props.saveDetailDoctor({
            contentHTML: contentHTML,
            contentMarkdown: contentMarkdown,
            description: description,
            doctorId: selectedDoctor.value,
            action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            selectedPrice: selectedPrice.value,
            selectedPayment: selectedPayment.value,
            selectedProvince: selectedProvince.value,
            nameClinic: nameClinic,
            addressClinic: addressClinic,
            note: note
        })
        await this.setState({
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            hasOldData: false,
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        })
    }
    //format ro dicdecimals
    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    //handle select change 
    handleSelectDoctorChange = async (selectedOption) => {
        const doctorInforDetail = {
            selectedDoctor: selectedOption,
            contentMarkdown: '',
            contentHTML: '',
            description: '',

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            hasOldData: false,

        }
        const { listPrice, listPayment, listProvince } = this.state
        const res = await userService.getDetailInforDoctor(selectedOption.value)
        if (res && res.errCode === 0 && res.data) {
            if (res.data.Markdown) {
                const markdown = res.data.Markdown;
                Object.assign(doctorInforDetail, { ...markdown, hasOldData: true });
            }
            if (res.data.Doctor_infor) {
                const doctorInfor = res.data.Doctor_infor
                const selectedPrice = listPrice.find((item) => { return (item.value === doctorInfor.priceId) }) || ''
                const selectedPayment = listPayment.find((item) => { return (item.value === doctorInfor.paymentId) }) || ''
                const selectedProvince = listProvince.find((item) => { return (item.value === doctorInfor.provinceId) }) || ''
                doctorInforDetail['selectedPrice'] = selectedPrice
                doctorInforDetail['selectedPayment'] = selectedPayment
                doctorInforDetail['selectedProvince'] = selectedProvince
                doctorInforDetail['nameClinic'] = doctorInfor.nameClinic || ''
                doctorInforDetail['addressClinic'] = doctorInfor.addressClinic || ''
                doctorInforDetail['note'] = doctorInfor.note || ''
            }

            // this.setState({
            //     selectedDoctor: selectedOption,
            //     contentMarkdown: markdown.contentMarkdown,
            //     contentHTML: markdown.contentHTML,
            //     description: markdown.description,
            //     hasOldData: true,
            // })
        }
        // else {
        //     this.setState({
        //         selectedDoctor: selectedOption,
        //         contentMarkdown: '',
        //         contentHTML: '',
        //         description: '',
        //     })
        // }
        this.setState({
            ...doctorInforDetail
        }, () => { console.log(this.state) })
    }
    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        const newState = _.cloneDeep(this.state)
        this.setState({
            ...newState,
            [name.name]: selectedOption,
        })
    }
    //handle textarea change 
    handleOnChangeText = (event) => {
        const newState = _.cloneDeep(this.state)
        const id = event.target.name
        switch (id) {
            case 'description':
                return this.setState({
                    ...newState,
                    [id]: event.target.value,
                })
            case 'nameClinic':
                return this.setState({
                    ...newState,
                    [id]: event.target.value,
                })
            case 'addressClinic':
                return this.setState({
                    ...newState,
                    [id]: event.target.value,
                })
            case 'note':
                return this.setState({
                    ...newState,
                    [id]: event.target.value,
                })

            default: {
                return this.setState({
                    ...newState
                })
            }
        }
    }

    render() {
        const {
            hasOldData,
            doctors,
            selectedDoctor,
            contentMarkdown,
            description,

            listPrice,
            selectedPrice,
            listPayment,
            selectedPayment,
            listProvince,
            selectedProvince,
            nameClinic,
            addressClinic,
            note,
        } = this.state

        return (
            <div className="manage-doctor">
                <div className="manage-doctor-container container">
                    <div className="row manage-doctor-content">
                        <div className="content-title my-3 col-12 form-group">
                            <FormattedMessage id="admin.manage-doctor.title" />
                        </div>
                        <div className="content-select-doctor my-3 col-4">
                            <label> <FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                            <Select
                                value={selectedDoctor}
                                options={doctors}
                                onChange={(selectedOption) => { this.handleSelectDoctorChange(selectedOption) }}
                                name="selectedDoctor"
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                            />
                        </div>
                        <div className="content-select-price my-3 col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.price" />
                            </label>
                            <Select
                                value={selectedPrice}
                                options={listPrice}
                                onChange={(listPrice, name) => { this.handleChangeSelectDoctorInfor(listPrice, name) }}
                                name="selectedPrice"
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-price" />}
                            />
                        </div>
                        <div className="content-select-payment my-3 col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.payment" />
                            </label>
                            <Select
                                value={selectedPayment}
                                options={listPayment}
                                onChange={(listPayment, name) => { this.handleChangeSelectDoctorInfor(listPayment, name) }}
                                name="selectedPayment"
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-payment" />}
                            />
                        </div>
                        <div className="content-select-province my-3 col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.province" />
                            </label>
                            <Select
                                value={selectedProvince}
                                options={listProvince}
                                onChange={(listProvince, name) => { this.handleChangeSelectDoctorInfor(listProvince, name) }}
                                name="selectedProvince"
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-province" />}
                            />
                        </div>
                        <div className="content-select-province my-3 col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.nameClinic" />
                            </label>
                            <FormattedMessage
                                id="admin.manage-doctor.nameClinic"
                            >
                                {
                                    placeholder => <input
                                        className="form-control"
                                        name="nameClinic"
                                        type="text"
                                        placeholder={`${placeholder}...`}
                                        value={nameClinic}
                                        onChange={(event) => { this.handleOnChangeText(event) }}
                                    />
                                }
                            </FormattedMessage>
                        </div>
                        <div className="content-select-province my-3 col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.addressClinic" />
                            </label>
                            <FormattedMessage
                                id="admin.manage-doctor.addressClinic"
                            >
                                {
                                    placeholder => <input
                                        className="form-control"
                                        type="text"
                                        name="addressClinic"
                                        placeholder={`${placeholder}...`}
                                        value={addressClinic}
                                        onChange={(event) => { this.handleOnChangeText(event) }}
                                    />
                                }
                            </FormattedMessage>

                        </div>
                        <div className="content-textarea my-3 col-6 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.note" />
                            </label>
                            <FormattedMessage
                                id="admin.manage-doctor.note"
                            >
                                {
                                    placeholder => <textarea
                                        className="form-control"
                                        name="note"
                                        rows="3"
                                        value={note}
                                        onChange={(event) => { this.handleOnChangeText(event) }}
                                        placeholder={`${placeholder}...`}
                                    >

                                    </textarea>
                                }
                            </FormattedMessage>

                        </div>
                        <div className="content-textarea my-3 col-6 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.intro" />
                            </label>
                            <FormattedMessage
                                id="admin.manage-doctor.intro"
                            >
                                {
                                    placeholder => <textarea
                                        className="form-control"
                                        name="description"
                                        rows="3"
                                        value={description}
                                        onChange={(event) => { this.handleOnChangeText(event) }}
                                        placeholder={`${placeholder}...`}
                                    >

                                    </textarea>
                                }
                            </FormattedMessage>

                        </div>
                        <div className="manage-doctor-editor col-12 my-3 form-group">
                            <MdEditor
                                style={{ height: '500px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={(html, text) => { this.handleEditorChange(html, text) }}
                                value={contentMarkdown}
                            />
                        </div>
                        <div className="col-12 mb-3 form-group">
                            <button
                                className={hasOldData === true ? "btn btn-warning w-100" : "btn btn-primary w-100"}
                                onClick={() => { this.handleSaveContentMarkdown() }}
                            >
                                {hasOldData === true ?
                                    <span>  <FormattedMessage id="admin.manage-doctor.save" /></span> :
                                    <span>  <FormattedMessage id="admin.manage-doctor.add" /></span>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        allDoctorsRedux: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
