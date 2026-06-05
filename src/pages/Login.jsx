import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import TextField from "../components/TextField.jsx";

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: ""
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};

    if (!values.email.trim()) {
      nextErrors.email = "Email address is required";
    }

    if (!values.password.trim()) {
      nextErrors.password = "Password is required";
    } else if (!passwordPattern.test(values.password)) {
      nextErrors.password =
        "Use 8+ chars with upper, lower, number and symbol";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("popx-user") || "null");
    const user = savedUser || {
      name: "Registered User",
      email: values.email.trim()
    };

    navigate("/account", { state: { user } });
  }

  return (
    <div className="screen form-screen">
      <h1>Signin to your PopX account</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
      <form className="form" noValidate onSubmit={handleSubmit}>
        <TextField
          error={errors.email}
          label="Email Address"
          name="email"
          onChange={handleChange}
          placeholder="Enter email address"
          type="email"
          value={values.email}
        />
        <TextField
          error={errors.password}
          label="Password"
          name="password"
          onChange={handleChange}
          placeholder="Enter password"
          type="password"
          value={values.password}
        />
        <Button className="button-muted" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
