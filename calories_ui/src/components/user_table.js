import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Table } from 'react-bootstrap';
import UserTableItem from './user_table_item';
import {removeUser} from '../actions/index'

const { object } = PropTypes;

class UserTable extends Component {
    componentDidMount() {
        const { fetchUsers, users } = this.props;
        const page = users.page;
        const limit = users.limit;
        const sort = users.sort;
        const order = users.order;
        fetchUsers(page, limit, sort, order);
    }

    handleSort = (sort) => {
        const { users, fetchUsers } = this.props;
        const order = (sort === users.sort && users.order === 'asc') ? 'desc' : 'asc';
        fetchUsers(users.page, users.limit, sort, order);
    }

    displaySorter = (field) => {
        const { users } = this.props;
        const className = classNames('glyphicon', 'sorter-icon', {
            'glyphicon-triangle-top': users.order === 'asc',
            'glyphicon-triangle-bottom': users.order === 'desc'
        });
        return users.sort === field ? <span className={className} /> : '';
    }

    render() {
        const { users, fetchUsers, removeUser} = this.props;
        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th className="field__sortable" onClick={() => this.handleSort('id')}>Id{this.displaySorter('id')}</th>
                    <th className="field__sortable" onClick={() => this.handleSort('name')}>Name{this.displaySorter('name')}</th>
                    <th className="field__sortable" onClick={() => this.handleSort('role')}>Role{this.displaySorter('role')}</th>
                    <th className="field__sortable" >Daily expectation</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {users.all.map(user => <UserTableItem
                                        key={user.id}
                                        user={user}
                                        users={users}
                                        fetchUsers={fetchUsers}
                                        removeUser={removeUser}/>)}
                </tbody>
            </Table>
        );
    }
}



function mapStateToProps(state) {
    return { users: state.users };
}

export default connect(mapStateToProps, {removeUser})(UserTable);

UserTable.propTypes = {
    users: object.isRequired
};


