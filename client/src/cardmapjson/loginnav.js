import { Link, useLocation } from "react-router-dom";

const Loginnav = () => {
    const location = useLocation();

    const tabContainerStyle = {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        padding: "15px",
        // backgroundColor: "#1e1e2e",
        borderRadius: "10px 10px 0 0",
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
    };

    const linkStyle = {
        textDecoration: "none",
        fontSize: "16px",
        fontWeight: "bold",
        padding: "10px 20px",
        color: "black",
        borderRadius: "5px",
        transition: "all 0.3s ease-in-out",
    };

    const activeLoginStyle = {
        backgroundColor: "#4f46e5",
        boxShadow: "0 4px 10px rgba(79, 70, 229, 0.3)",
        color: "white"
    };

    const activeRegisterStyle = {
        backgroundColor: "#ff5733",
        boxShadow: "0 4px 10px rgba(255, 87, 51, 0.3)",
        color: "white"
    };

    return (
        <div style={tabContainerStyle}>
            <Link to="/" style={{...linkStyle,...(location.pathname === "/" ? activeLoginStyle : {})}}>LOGIN</Link>
            <Link to="/signuppage" style={{...linkStyle,...(location.pathname === "/signuppage" ? activeRegisterStyle : {})}}>REGISTER</Link>
        </div>
    );
};

export default Loginnav;
