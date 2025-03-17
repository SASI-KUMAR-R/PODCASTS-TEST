import React from "react";
import { Link } from "react-router-dom";
import "../CSS/AddPodcast.css";

function DeletePodcast() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
  };
  
  return (
    <div className="Maindiv">
      <div className="maindiv">
        <h1 className="font">DELETE YOUR PODCAST</h1>

        <form onSubmit={handleSubmit}>
          <div className="inputdiv">
            <label htmlFor="username">Name Of Podcast :</label>
            <input
              type="text"
              name="username"
              placeholder="Enter the Name..."
              required
            />
            <br />
            <button type="submit" className="signuptag">
              DELETE PODCAST
            </button>
          </div>
        </form>

        <div className="logindiv">
          <Link to="/libhome" className="Linktag">
            Go To Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DeletePodcast;
