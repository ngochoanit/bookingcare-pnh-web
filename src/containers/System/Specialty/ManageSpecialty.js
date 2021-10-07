import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSpecialty.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import _ from 'lodash'
import 'react-markdown-editor-lite/lib/index.css';
import { CommonUtils } from '../../../utils';
import specialtyDefault from '../../../assets/specialty/specialty-default.jpg';
import { userService } from '../../../services/userService'
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */)
class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
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
    handleSaveNewSpecialty = async () => {
        const res = await userService.createNewSpecialty(this.state)
        if (res && res.errCode === 0) {
            toast.success("Create new specialty successed")
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHtml: '',
                descriptionMarkdown: ''
            })

        }
        else {
            toast.error("Create new specialty failed")
        }
    }
    render() {
        return (
            <div className="manage-specialty" >
                <div className="manage-specialty-container container">
                    <div className="row manage-specialty-header">
                        <div className="col-12">
                            <div className="manage-specialty-header-title">
                                Quản Lý Chuyên Khoa
                            </div>
                            {/* <div className="manage-specialty-header-btn">
                                <button className="btn btn-primary btn-add"><i class="fas fa-plus"></i></button>
                            </div> */}
                        </div>
                        <div className="col-12">

                        </div>
                    </div>
                    <div className="row manage-specialty-body my-3">
                        <div className="col-4 form-group">
                            <label>Ảnh Chuyên Khoa</label>
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
                                    style={{ backgroundImage: this.state.imageBase64 ? `url(${this.state.imageBase64})` : `url(${specialtyDefault})` }}
                                ></div>
                            </div>
                        </div>

                        <div className="col-8 form-group">
                            <label>Tên Chuyên Khoa</label>
                            <input
                                type="text" className="form-control"
                                onChange={(event) => { this.handleOnchangeInput(event, 'name') }}
                                value={this.state.name}
                                placeholder=""
                            />
                        </div>
                        <div className="col-12 form-group">
                            <MdEditor
                                style={{ height: '500px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={(html, text) => { this.handleEditorChange(html, text) }}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className="col-12 form-group">
                            <button
                                className="btn btn-primary"
                                onClick={() => { this.handleSaveNewSpecialty() }}

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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
