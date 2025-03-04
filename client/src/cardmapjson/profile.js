import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';
// import users from './user.js';
import './profile.css';

const Profile = () => {
    const [User, setUser] = useState(null);
    const [edit, setEdit] = useState(false);
    const [update, setUpdate] = useState({email: "",phone: ""});

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
    useEffect(() => {
        const username = localStorage.getItem("User");
        if (username) {
            axios.get(`http://localhost:3001/getuserbyname/${username}`)
                .then(res => {
                    setUser(res.data);
                    setUpdate(res.data);
                })
                .catch(error => console.error("Error fetching user data:", error));
        }
    }, []);

    const Change = (e) => {
        setUpdate({ ...update, [e.target.name]: e.target.value });
    };

    const Update = () => {
        if (edit) {
            axios.post(`http://localhost:3001/updateuser`, update)
                .then(() => {
                    setUser(update);
                    localStorage.setItem("User", update.name);
                    alert("Profile updated successfully!");
                })
                .catch(error => console.error("Error updating user:", error));
        }
        setEdit(!edit);
    };


    return (
        <div className="profile" >
            <Navbar />
            <div className="profile-container">
                <h2>User Info</h2>
                {User ? (
                    <form className="user-details">
                        <label>Name:</label>
                        <input type="text" name="name" value={update.name} onChange={Change} readOnly />
                        <label>Email:</label>
                        <input type="text" name="email" value={update.email} onChange={Change} readOnly={!edit} />
                        <label>Phone:</label>
                        <input type="text" name="phone" value={update.phone} onChange={Change} readOnly={!edit} />
                        <button type="button" className="btn" onClick={Update}>
                            {edit ? "Save" : "Update Details"}
                        </button>
                    </form>
                ) : (
                    <p className="error-msg">No user logged in</p>
                )}
            </div>
        </div>
    );
};  

export default Profile;
