import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../CSS/Pod.css";
import Navbar from "./Navbar";
import podcastData from "../JSON/DetailApi.json";

function Pod() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPodcasts = Object.keys(podcastData).filter((key) => {
    const podcast = podcastData[key];
    return podcast.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handledetailpage = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* Pass state */}
      <div className="main">
        {filteredPodcasts.length > 0 ? (
          filteredPodcasts.map((key) => {
            const podcast = podcastData[key];
            return (
              <div className="audio" key={key}>
                <img src={podcast.image} alt={podcast.title} onClick={() => handledetailpage(key)} />
                <h2>{podcast.title}</h2>
              </div>
            );
          })
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default Pod;
