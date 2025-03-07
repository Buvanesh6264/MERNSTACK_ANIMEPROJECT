import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; 
import "./css/profile.css";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [edit, setEdit] = useState(false);
    const [update, setUpdate] = useState({ email: "", phone: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem("User");
        if (username) {
            axios.get(`http://localhost:3001/getuserbyname/${username}`)
                .then((res) => {
                    setUser(res.data);
                    setUpdate(res.data);
                })
                .catch((error) => console.error("Error fetching user data:", error));
        }
    }, []);
    // useEffect(() => {
    //     const User = localStorage.getItem("User");
    //     if (User) {
    //         const user = users.find(u => u.name === User);
    //         if (user) {
    //             setUser(user);
    //             setUpdate(user);
    //         }
    //     }
    // }, []);
    // const Change = (e) => {
    //     setUpdate({ ...update, [e.target.name]: e.target.value });
    // };
    // const Update = () => {
    //     setEdit(!edit);
    //     if (edit) {
    //         setUser(update);
    //         localStorage.setItem("User", update.name);
    //         alert("Profile updated successfully!");
    //     }
    // };

    const handleChange = (e) => {
        setUpdate({ ...update, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        if (edit) {
            axios.post(`http://localhost:3001/updateuser`, update)
                .then(() => {
                    setUser(update);
                    localStorage.setItem("User", update.name);
                    alert("Profile updated successfully!");
                })
                .catch((error) => console.error("Error updating user:", error));
        }
        setEdit(!edit);
    };
    function logout(){
        navigate("/");
}
    return (
        <div className="profile">
            <Navbar />
            <div className="profile-container">
                {user ? (
                    <div className="profile-card">
                        <div className="profile-header">
                            <FaUserCircle className="avatar-icon" />
                            <h2>{user.name}</h2>
                        </div>
                        <div className="profile-body">
                            <form className="user-details">
                                <label>Name:</label>
                                <input type="text" name="name" value={update.name} readOnly />
                                
                                <label>Email:</label>
                                <input type="text" name="email" value={update.email} onChange={handleChange} readOnly={!edit} />
                                
                                <label>Phone:</label>
                                <input type="text" name="phone" value={update.phone} onChange={handleChange} readOnly={!edit} />
                                <div>
                                   <button type="button" className="btn" onClick={handleUpdate}>
                                       {edit ? "Save Changes" : "Edit Profile"}
                                   </button>
                                   <button className="logout" onClick={logout}>Logout</button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <p className="error-msg">No user logged in</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
