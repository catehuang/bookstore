import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Admin() {
        const user = useSelector((state) => state.user.currentUser);
        console.log(user);
        return (
                <div>{user.isAdmin}</div>
        );
}

export default Admin;
