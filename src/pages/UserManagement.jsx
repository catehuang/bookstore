import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetAllUsers, UpdateRole, DeleteUser } from "../api/user";

function UserManagement() {
    const [users, setUsers] = useState([]);
    const admin = useSelector((state) => state.user.currentUser);
    const [message, setMessage] = useState({});

    useEffect(() => {
        GetAllUsers().then((result) => setUsers(result));
    }, []);

    const handleRoleChanged = (e, user) => {
        setMessage({});
        if (user._id === admin._id) {
            setMessage({ err: "Error. Can not change your own role!" });
        } else {
            UpdateRole(user, e.target.value).then((result) =>
                setMessage({ msg: user.username + " has been updated" })
            );            
        }
    };

    const handleDelete = (user) => {
        setMessage({});
        DeleteUser(user).then(result => setMessage({msg: result.username + " has been deleted"}))
        GetAllUsers().then((result) => setUsers(result));
        window.scrollTo({ top: 0, left: 0 });
    }

    return (
        <div className="bg-sky-50 py-20">
            <div className="w-fit mx-auto py-10 bg-white sm:p-5 rounded-lg border border-sky-600">
                {message.msg && (
                    <p className="text-center py-2 mb-5 bg-green-200 rounded uppercase">
                        {message.msg}
                    </p>
                )}
                {message.err && (
                    <p className="text-center py-2 bg-red-50 text-red-600 rounded uppercase">
                        {message.err}
                    </p>
                )}
                <table className="sm:w-4/5 mx-auto">
                    <thead className="text-left">
                        <tr>
                            <th className="px-5">Action</th>
                            <th className="px-2 md:px-5">Username</th>
                            <th className="px-2 md:px-5">Email</th>
                            <th className="px-2 md:px-5">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="odd:bg-sky-100">
                                <td className="px-5 py-5">
                                    <button
                                        className="border rounded text-sm px-2 py-1 bg-red-700 text-red-50 disabled:bg-gray-600 hover:bg-red-800"
                                        disabled={user._id === admin._id}
                                        onClick={() => handleDelete(user)}
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td className="px-2 md:px-5">{user.username}</td>
                                <td className="px-2 md:px-5">{user.email}</td>
                                <td className="px-2 md:px-5">
                                    <select
                                        defaultValue={user.role === admin.role ? "admin" : "user"}
                                        className="border border-gray-300 rounded"
                                        onChange={(e) => handleRoleChanged(e, user)}
                                        disabled={user._id === admin._id}
                                    >
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
