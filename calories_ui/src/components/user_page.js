import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import {fetchUsers, clearErrors} from '../actions';
import UserTable from './user_table';

const { func, string } = PropTypes;


class UserPage extends Component {
    componentWillUnmount() {
        this.props.clearErrors();
    }

    render() {
        const { errorMessage} = this.props;
        return (
            <div>
                {errorMessage ? <Alert bsStyle="danger">{errorMessage}</Alert> : null}
                <LinkContainer to="/new">
                    <Button>Create</Button>
                </LinkContainer>
                <UserTable {...this.props} />
            </div>
        );
    }


}


function mapStateToProps(state) {
    return {
        users: state.users,
        errorMessage: state.errors
    };
}

export default connect(mapStateToProps,
    { fetchUsers, clearErrors })(UserPage);


UserPage.propTypes = {
    errorMessage: string.isRequired,
    clearErrors: func.isRequired,
};



