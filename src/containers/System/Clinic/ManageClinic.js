import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageClinic.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import _ from 'lodash'
import 'react-markdown-editor-lite/lib/index.css';
import { CommonUtils } from '../../../utils';
import clinicDefault from '../../../assets/clinic/clinic-default.jpg';
import { userService } from '../../../services/userService'
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */)
class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHtml: '',
            descriptionMarkdown: ''
        }
    }
    componentDidMount() {

    }
    handleOnchangeInput = (event, id) => {
        this.setState({
            ...this.state,
            [id]: event.target.value,
        })
    }
    //hendle onchange editor
    handleEditorChange({ html, text }) {
        this.setState({
            descriptionMarkdown: text,
            descriptionHtml: html,
        })
    }
    //handle onchange image
    handleOnchangeImage = async (event) => {
        const file = event.target.files[0]
        if (file) {
            const base64 = await CommonUtils.getBase64(file)
            event.target.value = ""
            this.setState({
                imageBase64: base64
            })

        }
    }
    handleSaveNewClinic = async () => {
        const res = await userService.createNewClinic(this.state)
        if (res && res.errCode === 0) {
            toast.success("Create new clinic successed")
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHtml: '',
                descriptionMarkdown: ''
            })

        }
        else {
            toast.error("Create new clinic failed")
        }
    }
    render() {
        const { name, address, descriptionMarkdown, imageBase64 } = this.state
        return (
            <div className="manage-clinic" >
                <div className="manage-clinic-container container">
                    <div className="row manage-clinic-header">
                        <div className="col-12">
                            <div className="manage-clinic-header-title">
                                Quản Lý Phòng Khám
                            </div>
                        </div>
                        <div className="col-12">

                        </div>
                    </div>
                    <div className="row manage-clinic-body my-3">
                        <div className="col-4 form-group">
                            <label>Ảnh Phòng Khám</label>
                            <div className="preview-img-container">
                                <input
                                    id="preview-image"
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(event) => { this.handleOnchangeImage(event) }}
                                />
                                <label className="label-upload" htmlFor="preview-image" > Tải Ảnh<i className="fas fa-upload"></i></label>
                                <div
                                    className="preview-image"
                                    style={{ backgroundImage: imageBase64 ? `url(${imageBase64})` : `url(${clinicDefault})` }}
                                ></div>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col-12 form-group">
                                    <label>Tên Phòng Khám</label>
                                    <input
                                        type="text" className="form-control"
                                        onChange={(event) => { this.handleOnchangeInput(event, 'name') }}
                                        value={name}
                                        placeholder=""
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label>Địa Chỉ Phòng Khám</label>
                                    <input
                                        type="text" className="form-control"
                                        onChange={(event) => { this.handleOnchangeInput(event, 'address') }}
                                        value={address}
                                        placeholder=""
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="col-12 form-group">
                            <MdEditor
                                style={{ height: '500px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={(html, text) => { this.handleEditorChange(html, text) }}
                                value={descriptionMarkdown}
                            />
                        </div>
                        <div className="col-12 form-group">
                            <button
                                className="btn btn-primary"
                                onClick={() => { this.handleSaveNewClinic() }}
                            >Save</button>
                        </div>

                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
