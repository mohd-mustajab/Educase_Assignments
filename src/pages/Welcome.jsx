import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="screen welcome-screen">
      <div className="welcome-content">
        <h1>Welcome to PopX</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
        <div className="action-stack">
          <Button onClick={() => navigate("/signup")}>Create Account</Button>
          <Button className="button-secondary" onClick={() => navigate("/login")}>
            Already Registered? Login
          </Button>
        </div>
      </div>
    </div>
  );
}
