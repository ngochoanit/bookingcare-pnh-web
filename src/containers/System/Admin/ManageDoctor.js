import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils/constant'
import { userService } from '../../../services/userService';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            doctors: [],
            hasOldData: false,
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors()

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            const dataSelector = this.buildDataInputSelect(this.props.allDoctorsRedux)
            this.setState({
                doctors: dataSelector,
            })
        }
        if (prevProps.language !== this.props.language) {
            const dataSelector = this.buildDataInputSelect(this.props.allDoctorsRedux)
            this.setState({
                doctors: dataSelector
            })
        }

    }
    buildDataInputSelect = (inputData) => {
        let result = []
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item) => {
                let obj = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName} `
                obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                obj.value = item.id
                return result.push(obj)
            })
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
        await this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: this.state.hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
        await this.setState({
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            hasOldData: false,
        })
    }
    //handle select change 
    handleSelectChange = async (selectedOption) => {
        const res = await userService.getDetailInforDoctor(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            const markdown = res.data.Markdown;
            this.setState({
                selectedDoctor: selectedOption,
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                hasOldData: true,
            })
        }
        else {
            this.setState({
                selectedDoctor: selectedOption,
                contentMarkdown: '',
                contentHTML: '',
                description: '',
            })
        }
    }
    //handle textarea change 
    handleTextareaChange = (event) => {
        this.setState({
            description: event.target.value,
        })
    }
    render() {
        const { hasOldData } = this.state
        return (
            <div className="manage-doctor">
                <div className="manage-doctor-container container">
                    <div className="row manage-doctor-content">
                        <div className="content-title my-3 col-12">
                            Tạo Thêm Thông Tin Doctor
                        </div>
                        <div className="content-select my-3 col-4">
                            <label>Lựa Chọn Bác Sĩ</label>
                            <Select
                                value={this.state.selectedDoctor}
                                options={this.state.doctors}
                                onChange={(selectedOption) => { this.handleSelectChange(selectedOption) }}
                            />
                        </div>
                        <div className="content-textarea my-3 col-8">
                            <label>Thông Tin Giới Thiệu</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                value={this.state.description}
                                onChange={(event) => { this.handleTextareaChange(event) }}
                            >

                            </textarea>

                        </div>
                        <div className="manage-doctor-editor col-12 my-3">
                            <MdEditor
                                style={{ height: '500px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={(html, text) => { this.handleEditorChange(html, text) }}
                                value={this.state.contentMarkdown}
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <button
                                className={hasOldData === true ? "btn btn-warning w-100" : "btn btn-primary w-100"}
                                onClick={() => { this.handleSaveContentMarkdown() }}
                            >
                                {hasOldData === true ?
                                    <span>Lưu Thông Tin</span> :
                                    <span>Tạo Thông Tin</span>
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
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
