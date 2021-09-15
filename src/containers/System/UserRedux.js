import React, { Component } from 'react';
import { connect } from 'react-redux';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
    }


    render() {
        return (
            <div className="user-redux-container">
                <div className="user-redux-title">User Redux Ngọc Hoàn</div>
                <div className="user-redux-body" >
                    <div> Thêm Mới Người Dùng</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
