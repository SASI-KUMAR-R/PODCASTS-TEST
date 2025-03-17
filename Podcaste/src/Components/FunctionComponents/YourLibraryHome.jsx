import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { useUser } from "../FunctionComponents/UserContext"; 
import "../CSS/YourLibraryHome.css";

function YourLibraryHome() {
  const { user } = useUser();  
  const [searchTerm, setSearchTerm] = useState(""); 
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || !user.userid) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchPodcasts = async () => {
      try {
        const response = await axios.get(`https://podcasts-test.onrender.com/mypodcasts/${user.userid}`);
        if (response.data.success) {
          setPodcasts(response.data.podcasts);
        } else {
          setError(response.data.message || "No podcasts found");
        }
      } catch (err) {
        setError("NO PODCASTS FOUND IN YOUR DATABASE");
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, [user]);

  const filteredPodcasts = podcasts.filter((podcast) =>
    podcast.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar setSearchTerm={setSearchTerm} /> 

      <div className="MAINDIVOFPOD">
        <div className="addpodcast">
          <h1>
            <Link to="/addpod" className="lokshaa">ADD YOUR PODCAST</Link>
          </h1>
        </div>
        <div className="deletepodcast">
          <h1>
            <Link to="/deletepod" className="lokshaa2">DELETE YOUR PODCAST</Link>
          </h1>
        </div>
      </div>

      <div className="userPodcasts">
        <h2>Your Uploaded Podcasts</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : filteredPodcasts.length > 0 ? (
          <div className="mainmain">
            {filteredPodcasts.map((podcast) => (
              <div key={podcast._id} className="audioaudio">
                <img src={`data:image/png;base64,${podcast.image}`} alt={podcast.title} />
                <h3>{podcast.title}</h3>
                <p>{podcast.description}</p>
                <audio controls>
                  <source src={`data:audio/mpeg;base64,${podcast.audio}`} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
          </div>
        ) : (
          <p>No podcasts found.</p>
        )}
      </div>
    </div>
  );
}

export default YourLibraryHome;
