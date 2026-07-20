import { useState } from "react";
import "../styles/SignUp.css";
import { useNavigate } from "react-router-dom";
import {supabase} from "../services/supabase.js";
 export function SignUp() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignUp = async (e) => {
  e.preventDefault();

  const { username, email, password } = user;

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        username: username,
      },
    },
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Account created successfully!");

  console.log(data);

  navigate("/login");
};
const navigate = useNavigate();
  return (
    <div className="signup-container">
      <div className="signup-card">

        <h1 className="logo">ResumeIQ</h1>
<br/>
        <h2>Create Account</h2>

        <p className="subtitle">
          Start your AI-powered career journey.
        </p>

        <form onSubmit={handleSignUp}>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button type="submit" >
            Create Account
          </button>

        </form>

        <p className="login-text">
          Already have an account?
          
          <span onClick={() => navigate("/login")}>
  Login
</span>
        </p>

      </div>
    </div>
  );
}

export default SignUp;