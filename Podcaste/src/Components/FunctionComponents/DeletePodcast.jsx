import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../CSS/AddPodcast.css";

function DeletePodcast() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setMessage("Please enter a podcast name.");
      return;
    }

    try {
      const response = await axios.delete("https://podcasts-test.onrender.com/deletepodcast", {
        data: { title }, 
      });

      if (response.data.success) {
        setMessage("Podcast deleted successfully.");
      } else {
        setMessage(response.data.message || "Failed to delete podcast.");
      }
    } catch (error) {
      setMessage("Error deleting podcast. Please try again.");
    }
  };

  return (
    <div className="Maindiv">
      <div className="maindiv">
        <h1 className="font">DELETE YOUR PODCAST</h1>

        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="inputdiv">
            <label htmlFor="title">Name Of Podcast :</label>
            <input
              type="text"
              name="title"
              placeholder="Enter the Name..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
