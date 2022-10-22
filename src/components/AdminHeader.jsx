import React from "react";
import { Link } from "react-router-dom";


function AdminHeader() {
    return (
        <div className="bg-sky-700 text-sky-100 border border-blue-800">
            <div className="px-10 py-2">
                <ul className="flex space-x-10">
                    <li>
                        <Link to="/bookManagement">Book Management</Link>
                    </li>
                    <li>
                        <Link to="">User Management</Link>
                    </li>
                    <li>
                        <Link to="">Analysis</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default AdminHeader;
