import "../CSS/SignUp.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [userName, setuser] = useState();
  const [emailid, setemailid] = useState();
  const [password, setpassword] = useState();
  const [phone, setphone] = useState();
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://test-podcast.onrender.com/signup", {
        username: userName,
        emailid: emailid,
        password: password,
        phonenumber: phone,
      });

      const message = response.data.message;
      const isSignup = response.data.isSignup;

      alert(message);
      if (isSignup) {
        navigate("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="Maindiv">
      <h1 className="font">WELCOME TO PODCASTS</h1>
      <div className="maindiv">
        <h1 className="font">SIGN UP</h1>
        <form onSubmit={handleSignup}>
          <div className="inputdiv">
            <label>USERNAME :</label>
            <input type="text" name="username" placeholder="Enter Username" onChange={(e) => setuser(e.target.value)} />

            <label>EMAILID :</label>
            <input type="email" name="email" placeholder="Enter Emailid" onChange={(e) => setemailid(e.target.value)} />

            <label>PASSWORD :</label>
            <input type="password" name="password" placeholder="Enter Password" onChange={(e) => setpassword(e.target.value)} />

            <label>PhoneNumber :</label>
            <input type="number" name="phoneNumber" placeholder="PhoneNumber" onChange={(e) => setphone(e.target.value)} />
            <br />
            <button type="submit" className="signuptag">SignUp</button>
          </div>
        </form>
        <div className="logindiv">
          <p>Already a Account Holder??</p>
          <Link to="/" className="Linktag">
            Go To Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
