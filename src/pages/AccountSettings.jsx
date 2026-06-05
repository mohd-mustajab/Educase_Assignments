import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";

export default function AccountSettings() {
  const navigate = useNavigate();
  const location = useLocation();
  const savedUser = JSON.parse(localStorage.getItem("popx-user") || "null");
  const user = location.state?.user || savedUser || {
    name: "Marry Doe",
    email: "Marry@gmail.com"
  };

  function handleLogout() {
    localStorage.removeItem("popx-user");
    navigate("/");
  }

  return (
    <div className="account-screen">
      <header>Account Settings</header>
      <section className="profile-panel">
        <div className="profile-row">
          <div className="avatar-wrap">
            <img
              alt="Marry Doe"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80"
            />
            <span aria-hidden="true">📷</span>
          </div>
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>
        <p className="bio">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
          Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat,
          Sed Diam
        </p>
      </section>
      <div className="logout-area">
        <Button className="logout-button" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
