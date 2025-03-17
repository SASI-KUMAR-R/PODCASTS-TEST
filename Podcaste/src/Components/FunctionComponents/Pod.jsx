import { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Pod.css";
import Navbar from "./Navbar";
import podcastData from "../JSON/DetailApi.json";

function Pod() {
  const [searchTerm, setSearchTerm] = useState("");
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get("https://podcasts-test.onrender.com/allpodcasts");
        if (response.data.success) {
          // Convert backend data format
          const backendPodcasts = response.data.podcasts.map((podcast) => ({
            id: podcast._id,
            title: podcast.title,
            description: podcast.description,
            image: `data:image/png;base64,${podcast.image}`,
            audio: `data:audio/mpeg;base64,${podcast.audio}`,
          }));

          // Convert local JSON data format
          const localPodcasts = Object.keys(podcastData).map((key) => ({
            id: key,
            ...podcastData[key],
          }));

          // Merge both datasets
          setPodcasts([...backendPodcasts, ...localPodcasts]);
        } else {
          setError("No podcasts found");
        }
      } catch (err) {
        setError("Error fetching podcasts");
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const filteredPodcasts = podcasts.filter((podcast) =>
    podcast.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="podcast-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="podcast-error">{error}</p>
        ) : filteredPodcasts.length > 0 ? (
          <div className="podcast-grid">
            {filteredPodcasts.map((podcast) => (
              <div key={podcast.id} className="podcast-card">
                <img src={podcast.image} alt={podcast.title} className="podcast-image" />
                <h3>{podcast.title}</h3>
                <p>{podcast.description}</p>
                <audio controls>
                  <source src={podcast.audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
          </div>
        ) : (
          <p className="podcast-no-results">No results found.</p>
        )}
      </div>
    </div>
  );
}

export default Pod;
