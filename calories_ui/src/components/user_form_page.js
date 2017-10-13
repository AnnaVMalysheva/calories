import React, { Component }  from 'react';
import {initialize} from 'redux-form';
import { connect } from 'react-redux';
import UserForm from './user_form'


class UserFormPage extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
           this.props.initialize("signup", this.props.updatedUser);
    }

    render() {
        return (
            <div>
                {
                       <UserForm/>
                }
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    // const { match } = props;
    // if (match.params.id) {
    //     return {
    //         updatedUser: state.users.all.find(item => item.id === match.params.id)
    //     }
    // }

    return { updatedUser: {email:"xxcx", password:"xcxcx", dailyExpectation:"xcx", role: "select"} };
}

export default connect(mapStateToProps, { initialize })(UserFormPage);