import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../FunctionComponents/UserContext";  
import "../CSS/AddPodcast.css";

function AddPodcast() {
  const { user } = useUser(); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    if (!title || !description || !image || !audio) {
      setMessage("All fields are required.");
      setLoading(false);
      return;
    }

    if (!user?.userid) {
      setMessage("User ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userid", String(user.userid));  
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("audio", audio);

      const response = await axios.post(
        "https://test-podcast.onrender.com/addpodcast",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        setMessage(" Podcast added successfully!");
        setTitle("");  
        setDescription("");
        setImage(null);
        setAudio(null);
      } else {
        setMessage("Failed to add podcast.");
      }
    } catch (error) {
      console.error("Error uploading podcast:", error);
      setMessage(" Error uploading podcast. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Maindiv">
      <div className="maindiv">
        <h1 className="font">ADD YOUR PODCAST</h1>

        <form onSubmit={handleSubmit}>
          <div className="inputdiv">
            <label>Name Of Podcast:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the Name..."
              required
            />

            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description Of Podcast.."
              required
            />

            <label>Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />

            <label>Upload Audio:</label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setAudio(e.target.files[0])}
              required
            />

            <br />
            <button type="submit" className="signuptag" disabled={loading}>
              {loading ? "Uploading..." : "ADD PODCAST"}
            </button>
          </div>
        </form>

        {message && <p className="messagepodcast">{message}</p>}

        <div className="logindiv">
          <Link to="/libhome" className="Linktag">
            Go To Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddPodcast;
