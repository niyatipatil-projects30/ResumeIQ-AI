import "../styles/Hero.css";
import { Link } from "react-router-dom";
import heroImg from "../assets/Profile data-cuate.svg";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <p className="tagline">
          🚀 AI Powered Resume Analyzer
        </p>

        <h1>
          Improve Your Resume Before
          <br />
          Applying for Your Dream Job
        </h1>

        <p className="hero-description">
          Upload your resume and receive instant AI-powered
          feedback, ATS compatibility score, skill gap
          analysis, and personalized suggestions to help
          you stand out.
        </p>

        <div className="hero-buttons">

          <Link to="/signup">
            <button className="start-btn">
              Get Started
            </button>
          </Link>

         <button
    className="learn-btn"
    onClick={() => {
      document
        .getElementById("features")
        .scrollIntoView({
          behavior: "smooth",
        });
    }}
  >
    Learn More
  </button>
        </div>

      </div>

      <div className="hero-right">

        <img
          src={heroImg}
          alt="ResumeIQ AI"
        />

      </div>

    </section>
  );
}

export default Hero;