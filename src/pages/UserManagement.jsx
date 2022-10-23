import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetAllUsers, UpdateRole } from "../api/user";

function UserManagement() {
    const [users, setUsers] = useState([]);
    const admin = useSelector(state => state.user.currentUser);
    const [message, setMessage] = useState("")

    useEffect(() => {
        GetAllUsers().then((result) => setUsers(result));
    }, []);

    const handleRoleChanged = (e, user) => {
        UpdateRole(user, e.target.value).then((result) => setMessage(user.username + " has been updated"))
        GetAllUsers().then((result) => setUsers(result));
    }

    return (
        <div className="bg-sky-50 py-20">
            <div className="w-fit mx-auto py-10 bg-white p-5 rounded-lg border border-sky-600">
                {
                    message && <p className="text-center py-2 bg-sky-50 text-sky-600 rounded uppercase">{message}</p>
                }
                <table className="w-4/5 mx-auto border-separate border-spacing-3">
                    <thead className="text-left">
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <select defaultValue={user.role === admin.role? "admin": "user"} className="border border-gray-300 rounded" onChange={e => handleRoleChanged(e, user)}>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserManagement;
