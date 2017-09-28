import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import {fetchUsers} from '../actions';

const { object } = PropTypes;

class Feature extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    const {users} = this.props;
    return (
        <Table striped bordered condensed hover>
          <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Daily Expectation</th>
            <th></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {users.all.map(user => {
              return (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>{user.dailyExpectation}</td>
                    <td>
                    </td>
                    <td>
                    </td>
                  </tr>
              );
          })}
          </tbody>
        </Table>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

Feature.propTypes = {
    users: object.isRequired
};

export default connect(mapStateToProps, {fetchUsers})(Feature);
