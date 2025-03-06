import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './css/signuppage.css';
import img from './images/loginpage.jpg';
import Loginnav from './loginnav';

export default function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    const [Data, setData] = useState({ name: '', email: '', phone: '', password: ''});
    const [errors, setErrors] = useState({});

    function togglePasswordVisibility() {
        setShowPassword(prevState => !prevState);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name !== 'confirmPassword') {
            setData({ ...Data, [name]: value });
        }
    }

    async function validateForm() {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d+$/.test(formData.phone)) {
            newErrors.phone = "Phone number must contain only digits";
        } else if (formData.phone.length < 10) {
            newErrors.phone = "Phone number must be at least 10 digits";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 4) {
            newErrors.password = "Password must be at least 4 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        try {
            const res = await axios.post("http://localhost:3001/getuserbyemailorphone", {
                emailOrPhone: formData.email,
                password: formData.password
            });
            if (res.data.success) {
                newErrors.userExists = "User with this email or phone number already exists";
            }
        } catch (error) {
            console.log("User not found, proceeding with signup.");
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (await validateForm()) {
            try {
                await axios.post("http://localhost:3001/adduser", Data);
                alert("Registration successful!");
                navigate('/');
            } catch (error) {
                alert("Error registering user");
                console.error("Signup Error:", error);
            }
        }
    }

    return (
        <div className="box">
            <div className='login-image'>
                <img src={img} alt='log-img' />
            </div>
            <form className="form" onSubmit={handleSubmit}>
                {/* <h1 className="form-title">Register User</h1> */}
                <Loginnav /><br/>
                <div className="form-group">
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                    <label className="form-label">Enter Your Name</label>
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>

                <div className="form-group">
                    <input type="text" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                    <label className="form-label">Enter Your Email</label>
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
                    <label className="form-label">Enter Your Phone</label>
                    {errors.phone && <p className="error-message">{errors.phone}</p>}
                </div>

                <div className="form-group">
                    <input type={showPassword ? "text" : "password"} name="password" className="form-control" value={formData.password} onChange={handleChange} required />
                    <label className="form-label">Enter Your Password</label>
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>

                <div className="form-group">
                    <input type={showPassword ? "text" : "password"} name="confirmPassword" className="form-control" value={formData.confirmPassword} onChange={handleChange} required />
                    <label className="form-label">Confirm Password</label>
                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                </div>

                {errors.userExists && <p className="error-message">{errors.userExists}</p>}

                <div className='form-show'>
                    {/* <Link to='/' className='Link'>Login</Link>  */}
                    <label className="showlabel">
                        <input type="checkbox" onChange={togglePasswordVisibility} checked={showPassword} />
                        Show Password
                    </label>  
                </div>

                <div className="bottom-box" style={{ alignItems: "center" }}>
                    <button type="submit" className="form-button">Submit</button>
                </div>
            </form>
        </div>
    );
}