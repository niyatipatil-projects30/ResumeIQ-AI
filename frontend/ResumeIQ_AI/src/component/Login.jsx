import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import {supabase} from "../services/supabase";
 export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  const { email, password } = user;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Login Successful!");

  console.log(data);

  navigate("/dashboard");
};
const  navigate=useNavigate();
  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="logo">ResumeIQ</h1>
<br/>
        <h2>Welcome Back</h2>

        <p className="subtitle">
          Login to continue your AI career journey.
        </p>

        <form onSubmit={handleLogin}>

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

          <button type="submit">
            Login
          </button>

        </form>

        <p className="signup-text">
          Don't have an account?
          <span onClick={()=> navigate("/signup")}>Sign Up</span>
        </p>

      </div>
    </div>
  );
}

export default Login;