import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import PropTypes from 'prop-types';

const { array, func, object } = PropTypes;

export default function (props) {
    const { id, username, role, dailyExpectation, key } = props.user;

    const handleClickRemoveBtn = () => {
        const { page, limit, sort, order, count, all } = props.users;
        // Check if there is the last page and if the element is the last
        const shouldRemoveFromState = Math.ceil(count / limit) === Number(page) &&
            (all.length !== 1 || Number(page) === 1);
        const pageNumer = (all.length === 1 && Number(page) !== 1) ? page - 1 : page;
        const callback = (count > limit) ?
            () => props.fetchUsers(pageNumer, limit, sort, order)
            : null;
        props.removeUser(id, shouldRemoveFromState, callback);
    };

    return (
        <tr key={key}>
            <td>{id}</td>
            <td>{username}</td>
            <td>{role}</td>
            <td>{dailyExpectation}</td>
            <td>
                <Link to={{ pathname: '/new', search: `id=${id}` }}
                >copy
                </Link>
            </td>
            <td>
                <Button
                    bsStyle="link"
                    onClick={handleClickRemoveBtn}
                >Delete
                </Button>
            </td>
        </tr>
    );
};
