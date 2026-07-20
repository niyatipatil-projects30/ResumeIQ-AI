import {DashboardNavbar} from "../component/DashboardNavbar";
import "../styles/Dashboard.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {supabase} from "../services/supabase";

 export function Dashboard() {

  console.log(import.meta.env.VITE_API_URL)

  const [username, setUsername] = useState("");
const [totalUploads, setTotalUploads] = useState(0);
const [score, setLatestScore] = useState("--");

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUsername(user.user_metadata.username);
      }
    }

    getUser();

    getDashboardData();
  }, []);

const getDashboardData = async () => {

    try {

        const response = await fetch(`${import.meta.env.VITE_API_URL}/resumes`);

        const result = await response.json();

        if (result.success) {

            const resumes = result.data;

            setTotalUploads(resumes.length);

            if (resumes.length > 0) {

                const latest = resumes[resumes.length - 1];

                setLatestScore(latest.score);

                

            }

        }

    } catch (err) {

        console.log(err);

    }

};

  return (
    <>
      <DashboardNavbar />

      <div className="dashboard-container">

        <h1>Welcome Back,    {username}! </h1>
<br/>
        <p className="welcome-text">
          We're ready to analyze your next resume.
        </p>

        <div className="resume-card">

          <h2>📄 Uploaded Resume</h2>

          <p>No resume uploaded yet.</p>

          <Link to="/uploadresume" className="upload-link">
            Upload Resume →
          </Link>

        </div>

      </div>
    </>
  );
}

export default Dashboard;