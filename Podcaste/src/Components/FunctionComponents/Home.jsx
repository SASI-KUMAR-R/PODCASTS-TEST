import "../CSS/Home.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import Navbar from "./Navbar";

function Home() {
  const containerRef = useRef(null);
  return (
    <div>
      <Navbar />
      <div className="Hometag">
        <h1>WELCOME TO THE PODCASTS</h1>
        <h2>
          GO TO{" "}
          <Link to="/pod" className="TAGA">
            GLOBAL LIBRARY
          </Link>
        </h2>
        <h2>
          GO TO{" "}
          <Link to="/libhome" className="TAGA">
            YOUR LIBRARY
          </Link>
        </h2>
      </div>
    </div>
  );
}

export default Home;
