import { useEffect, useState } from "react";
import {DashboardNavbar} from "../component/DashboardNavbar";
import {supabase} from "../services/supabase";
import "../styles/Profile.css";
import { FaUserCircle } from "react-icons/fa";

 export function Profile() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    created_at: "",
  });

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserData({
          username: user.user_metadata.username,
          email: user.email,
          created_at: user.created_at,
        });
      }
    }

    getUser();
  }, []);

  return (
    <>
      <DashboardNavbar/>

      <div className="profile-container">

        <div className="profile-card">

          <FaUserCircle className="profile-icon" />

          <h1>{userData.username}</h1>
<br/>
          <p>ResumeIQ AI Member</p>

          <div className="info-box">

            <label>Username</label>

            <div>{userData.username}</div>

          </div>

          <div className="info-box">

            <label>Email</label>

            <div>{userData.email}</div>

          </div>

          <div className="info-box">

            <label>Account Created</label>

            <div>
              {new Date(userData.created_at).toLocaleDateString()}
            </div>

          </div>

          

        </div>

      </div>
    </>
  );
}

export default Profile;