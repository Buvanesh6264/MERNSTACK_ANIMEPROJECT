import {  useNavigate } from 'react-router-dom';
import {  useState} from 'react';
import './loginpage.css';
// import users from './user'
import axios from "axios";
import img from './images/loginpage.jpg'
import Loginnav from './loginnav';

export default function Login() {
    const navigate = useNavigate();
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const [loading, setLoading] = useState(false);

    // function validateUser(emailOrPhone, password) {
    //     const user = users.find(user =>
    //         (user.email === emailOrPhone || user.phone === emailOrPhone) && user.password === password
    //     );
    
    //     return user ? true : false;
    // }
    // function togglePasswordVisibility() {
        // const passwordInput = document.querySelector("#txtPassword");
        // if (passwordInput) {
        //     const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        //     passwordInput.setAttribute("type", type);
        // }
        // const ckbox =document.querySelector("#show");
               
    // }
    function togglePasswordVisibility() {
        setShowPassword(prevState => !prevState);
    }

    // const handleLogin =  (e) => {
    //     e.preventDefault();
    //     const isValid =  validateUser(emailOrPhone, password);
    //     if (isValid) {
    //         navigate("/homepage");
    //     } else {
    //         setError("Invalid credentials. Please try again.");
    //     }
    // };
    // useEffect(()=>{
    //     alert("Welcome To MYANIME(Login To watch and get info About the Anime you like)")
    // },[])
    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     const user = users.find(user =>
    //         (user.email === emailOrPhone || user.phone === emailOrPhone) && user.password === password
    //     );
    
    //     if (user) {
    //         localStorage.setItem("User", user.name); // Store the user's name
    //         navigate("/home");
    //     } else {
    //         setError("Invalid credentials. Please try again.");
    //     }
    // };
    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //         const response = await axios.post("http://localhost:3001/getuserbyemailorphone", { emailOrPhone,password});
    //         if (response.data.success) {
    //             localStorage.setItem("User", response.data.user.name);
    //             navigate("/home");
    //         } else {
    //             console.log("error")
    //             setError("Invalid credentials. Please try again.");
    //         }
    // };
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        // setLoading(true);
        
        try {
            const res = await axios.post("http://localhost:3001/getuserbyemailorphone", { emailOrPhone, password });

            if (res.data.success) {
                localStorage.setItem("User", res.data.user.name); 
                navigate("/home");
            } else {
                setError("Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error("Login Error:", error);
            setError("Invalid credentials. Please try again.");
        }
        // setLoading(false);
    };
    
    return (
        <div className="box">
            {/* <h1>Welcome To AnimeWorld Login To Know More About Anime</h1> */}
            <div className='login-image'>
                <img src={img} alt='log-img'/>
            </div>
            <form className="form" onSubmit={handleLogin}>
                {/* <img src={""} alt="logo" /> */}
                {/* <h1 className="form-title">Login</h1><br /><br /> */}
                <Loginnav />
                <div className="form-group">
                    <input type="text" className="form-control" required value={emailOrPhone}onChange={(e) => setEmailOrPhone(e.target.value)}/>
                    <label className="form-label">Email or Phone</label>
                </div><br/><br />
                <div className="form-group">
                    <input type={showPassword ? "text" : "password"} className="form-control" required id="txtPassword"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <label className="form-label">Enter Your Password</label>
                </div><br/><br />
                <div className='form-show'>
                    {/* <Link to='/Signuppage' className='Link'>New User?</Link>  */}
                    <label className="showlabel" htmlFor="show"> 
                        <input type="checkbox" id="show" onChange={togglePasswordVisibility} checked={showPassword} />
                        Show Password
                    </label>  
                </div><br/>


                {error && <p className="error-message">{error}</p>}

                <div className="bottom-box" >
                    <button className="form-button" type="submit">Next</button>
                </div>
            </form>
        </div>
    );
}
