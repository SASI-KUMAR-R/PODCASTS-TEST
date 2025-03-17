import { useParams } from "react-router-dom";
import "../CSS/Detail.css";
import Player from "./AudioPlayer";
import Navbar from "./Navbar";
import podcastData from "../JSON/DetailApi.json";

function Detail() {
  const { id } = useParams();
  const podcast = podcastData[id] || podcastData[1];

  return (
    <div>
      <Navbar />
      <div className="mainproject">
        <div className="project1">
          <img src={podcast.image} alt={podcast.title} />
          <h1 className="h1tagdirect">{podcast.title}</h1>
          <p className="p1tagdirect">
            {podcast.description.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
        <Player src={podcast.audio} />
      </div>
    </div>
  );
}

export default Detail;
