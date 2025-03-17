import React, { useState } from "react";
import "../CSS/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../FunctionComponents/UserContext";  

const Login = () => {
  const [emailid, setemailid] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser(); 

  const handlepage = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://test-podcast.onrender.com/login", {
        emailid,
        password,
      });

      if (response.data.isLogin) {
        alert(response.data.message);
        setUser({ userid: response.data.userid }); 
        navigate("/Home");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="Maindivuser">
      <h1 className="font">WELCOME TO PODCASTS</h1>
      <div className="User">
        <h3 className="font">Login</h3>
        <form onSubmit={handlepage}>
          <div className="FormInput">
            <label>Email:</label>
            <input
              id="Email"
              placeholder="Enter your Email"
              value={emailid}
              onChange={(e) => setemailid(e.target.value)}
            />

            <label>Password:</label>
            <input
              id="Password"
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />

            <button type="submit" className="btn">Login</button>
          </div>
        </form>
        <div className="signup">
          <p>Don't have an account?</p>
          <br />
          <Link to="/signup" className="signupbtn">
            Go To SignUp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
