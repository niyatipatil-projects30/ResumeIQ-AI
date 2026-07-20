import "../styles/Features.css";
import {
  FaFileAlt,
  FaRobot,
  FaEnvelope,
  FaCloudUploadAlt,
  FaChartLine,
  FaBolt,
} from "react-icons/fa";

export function Features() {
  const features = [
    {
      icon: <FaFileAlt />,
      title: "Resume Upload",
      desc: "Upload PDF, DOC, DOCX, JPG, JPEG or PNG resumes securely.",
    },
    {
      icon: <FaRobot />,
      title: "AI Analysis",
      desc: "Powered by Groq AI to analyze resumes and provide suggestions.",
    },
    {
      icon: <FaEnvelope />,
      title: "Email Reports",
      desc: "Receive your resume analysis instantly through Resend.",
    },
    {
      icon: <FaCloudUploadAlt />,
      title: "Secure Storage",
      desc: "Your resumes are securely stored using Supabase Storage.",
    },
    {
      icon: <FaChartLine />,
      title: "Resume Score",
      desc: "Understand your ATS compatibility and resume quality.",
    },
    {
      icon: <FaBolt />,
      title: "Fast Results",
      desc: "Get AI-powered feedback within seconds after uploading.",
    },
  ];

  return (
    <section className="features"nid="features">

      <h2>Why Choose ResumeIQ AI?</h2>

      <div className="feature-grid">

        {features.map((feature, index) => (
          <div className="feature-card" key={index}>

            <div className="icon-circle">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.desc}</p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Features;