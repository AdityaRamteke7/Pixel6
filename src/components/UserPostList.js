// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData, setSorting, setFilter } from '../redux/action/userAction';

const UserList = () => {
    const [limit] = useState(10);
    const [skip, setSkip] = useState(0);
    const { users, loading, error } = useSelector(state => state.users);
    const dispatch = useDispatch();

    console.log(users)


    return (
        <div>
            <h1>User List</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <table>
                <tbody>
                    {users && users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.age}</td>
                            <td>{user.gender}</td>
                            <td>{user.country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
