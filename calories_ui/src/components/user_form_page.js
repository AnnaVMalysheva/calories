import React, { Component }  from 'react';
import {initialize} from 'redux-form';
import { connect } from 'react-redux';
import {ConnectedEditUserForm, ConnectedCreateUserForm} from './user_form'


class UserFormPage extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
           this.props.initialize("editUser", this.props.updatedUser);
    }



    render() {
        return (
            <div>

                { this.props.updatedUser.id ? (<ConnectedEditUserForm />) : (<ConnectedCreateUserForm />) }
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    const { match } = props;
    if (match.params.id) {
         return {
             updatedUser: state.users.all.find(item => item.id === parseInt(match.params.id))
         }
     } else {
        return {updatedUser: {email: "", password: "", dailyExpectation: "", role: "select"}};
    }
}

export default connect(mapStateToProps, { initialize })(UserFormPage);