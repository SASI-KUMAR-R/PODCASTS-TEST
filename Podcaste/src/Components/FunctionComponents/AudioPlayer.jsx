import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../CSS/AudioPlayer.css";

const Player = ({ src }) => (
  <AudioPlayer
    autoPlay={false} // Avoid autoplay issues
    src={src} // Dynamic source
    onPlay={() => console.log("Audio is playing")}
    className="audiostyle"
  />
);

export default Player;
