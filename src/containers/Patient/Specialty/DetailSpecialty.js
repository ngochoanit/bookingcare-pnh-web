import React, { Component } from 'react';
import { connect } from "react-redux"
import { LANGUAGES } from '../../../utils/constant'
import { userService } from '../../../services/userService'
import DoctorSchedule from '../Doctor/DoctorSchedule'
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import Select from 'react-select'
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialtyId: '',
            arrDoctors: [],
            dataDetailSpecialty: {},
            listProvince: [],
            selectedProvince: ""
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {

            let [resDetailSpecialty, resProvince] = await Promise.all([
                userService.getDetailSpecialtyById({
                    specialtyId: this.props.match.params.id,
                    location: "ALL"
                }),
                userService.getAllCodeService('PROVINCE')])

            if (resDetailSpecialty && resProvince && resProvince.errCode === 0 && resDetailSpecialty.errCode === 0) {
                const listProvinceData = this.buildDataInputSelect(resProvince.data, "PROVINCE")
                this.setState({
                    specialtyId: this.props.match.params.id,
                    dataDetailSpecialty: resDetailSpecialty.data,
                    listProvince: listProvinceData,
                    selectedProvince: listProvinceData[0]
                })
            }
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.language !== this.props.language) {
            const resProvince = await userService.getAllCodeService('PROVINCE')
            const listProvinceData = this.buildDataInputSelect(resProvince.data, "PROVINCE")
            const selectedProvince = listProvinceData.find((item) => { return (item.value === this.state.selectedProvince.value) })
            this.setState({
                listProvince: listProvinceData,
                selectedProvince: selectedProvince || this.state.selectedProvince
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
            if (type === "PAYMENT") {
                inputData.map((item) => {
                    let obj = {}
                    let labelVi = item.valueVi
                    let labelEn = item.valueEn
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.keyMap
                    return result.push(obj)
                })
            }
            if (type === "PROVINCE") {
                inputData = [{
                    keyMap: "ALL",
                    valueVi: "Toàn Quốc",
                    valueEn: "Nationwide"
                }].concat(inputData)
                inputData.map((item) => {
                    let obj = {}
                    let labelVi = item.valueVi
                    let labelEn = item.valueEn
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.keyMap
                    return result.push(obj)
                })
            }
            if (type === "SPECIALTY") {
                inputData.map((item) => {
                    let obj = {}
                    obj.label = item.name
                    obj.value = item.id
                    return result.push(obj)
                })
            }
        }
        return result
    }
    handleSelectChange = async (selectedOption) => {
        const resDetailSpecialty = await userService.getDetailSpecialtyById({
            specialtyId: this.props.match.params.id,
            location: selectedOption.value || "ALL"
        })
        if (resDetailSpecialty && resDetailSpecialty.errCode === 0) {
            this.setState({
                selectedProvince: selectedOption,
                dataDetailSpecialty: resDetailSpecialty.data,
            })
        }

        else {
            this.setState({
                selectedProvince: selectedOption,

            })
        }
    }
    render() {

        let { dataDetailSpecialty, listProvince, selectedProvince } = this.state
        console.log(listProvince)
        let arrDoctors = dataDetailSpecialty.doctorData || []
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className="detail-specialty-wrap">
                    <div className="detail-specialty-top" style={{ backgroundImage: `url(${dataDetailSpecialty.image})` }} >
                        <div className="detail-specialty-top-container" >
                            <div class="container">

                                <div className="row">
                                    <div className="col-12">
                                        <div className="detail-specialty-top-content" dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHtml }} ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detail-specialty-bottom">

                        <div className="detail-specialty-bottom-container container">
                            <div className="row">
                                <div className="detail-specialty-bottom-select">
                                    <Select
                                        value={selectedProvince}
                                        options={listProvince}
                                        onChange={(selectedOption) => { this.handleSelectChange(selectedOption) }}
                                    />
                                </div>
                                {
                                    arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item) => {
                                        return (<div className="col-12 detail-specialty-item " key={item.id}>
                                            <div className="row detail-specialty-item-content">
                                                <div className="col-6 detail-specialty-item-content-left">
                                                    <ProfileDoctor
                                                        doctorId={item.doctorId}
                                                        isShowDescription={true}
                                                        isShowLinkDetail={true}
                                                        isShowPrice={false}
                                                    />
                                                </div>
                                                <div className="col-6 detail-specialty-item-content-right">
                                                    <DoctorSchedule doctorId={item.doctorId} />
                                                    <DoctorExtraInfor doctorId={item.doctorId} />
                                                </div>
                                            </div>
                                        </div>)

                                    })
                                }


                            </div>
                        </div>
                    </div>
                </div>

                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
