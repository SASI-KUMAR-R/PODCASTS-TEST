import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Navbar.css";
import { IoIosNotifications } from "react-icons/io";
import ShinyText from "./ShinyText";
import { Link } from "react-router-dom";

function Navbar({ searchTerm, setSearchTerm }) { 
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">
          <Link to="/Home" className="atag">PODCASTS</Link>
        </div>
        <div className="searchbar">
          <input
            type="text"
            placeholder="SEARCH..."
            className="search-input"
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        <div className="extrasome">
          <div className="notification-wrapper">
            <button 
              className="buttonstyle" 
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              <IoIosNotifications className="iconsstyle" />
            </button>

            {isDropdownOpen && (
              <div className="dropdown-inside">
                <p>No new notifications</p>
              </div>
            )}
          </div>

          <button className="buttonstyle2" onClick={() => navigate("/")}>
            <ShinyText
              text="LOG OUT"
              disabled={true}
              speed={3}
              className="custom-class"
            />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
