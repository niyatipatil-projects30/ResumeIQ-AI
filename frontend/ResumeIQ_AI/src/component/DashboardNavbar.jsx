import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import {supabase} from "../services/supabase";
import "../styles/DashboardNavbar.css";

 export function DashboardNavbar() {
  const navigate = useNavigate();
// const [username, setUsername] = useState("");
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <>
      <nav className="dashboard-navbar">

        <div className="logo">
          ResumeIQ AI
        </div>

        <div className="user-section">
          
          <span onClick={()=> navigate("/profile")}><FaUserCircle className="user-icon"/></span>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

      </nav>

      <div className="dashboard-menu">

        <Link to="/">Home</Link>

        <Link to="/profile">Profile</Link>

        <Link to="/uploadresume">Upload Resume</Link>

        <Link to="/analytics">Analytics</Link>

      </div>
    </>
  );
}

export default DashboardNavbar;