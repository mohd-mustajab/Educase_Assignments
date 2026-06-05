import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import TextField from "../components/TextField.jsx";

const initialValues = {
  fullName: "",
  phone: "",
  email: "",
  password: "",
  company: ""
};

const fieldLabels = {
  fullName: "Full name",
  phone: "Phone number",
  email: "Email address",
  password: "Password",
  company: "Company name"
};

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export default function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
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

    const nextErrors = Object.entries(values).reduce(
      (currentErrors, [name, value]) => {
        if (!value.trim()) {
          currentErrors[name] = `${fieldLabels[name]} is required`;
        }

        return currentErrors;
      },
      {}
    );

    if (values.password && !passwordPattern.test(values.password)) {
      nextErrors.password =
        "Use 8+ chars with upper, lower, number and symbol";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const user = {
      name: values.fullName.trim(),
      email: values.email.trim()
    };

    localStorage.setItem("popx-user", JSON.stringify(user));
    navigate("/account", { state: { user } });
  }

  return (
    <div className="screen signup-screen">
      <div>
        <h1>Create your PopX account</h1>
        <form className="form" id="signup-form" noValidate onSubmit={handleSubmit}>
          <TextField
            error={errors.fullName}
            label="Full Name"
            name="fullName"
            onChange={handleChange}
            required
            value={values.fullName}
          />
          <TextField
            error={errors.phone}
            label="Phone number"
            name="phone"
            onChange={handleChange}
            required
            value={values.phone}
          />
          <TextField
            error={errors.email}
            label="Email address"
            name="email"
            onChange={handleChange}
            required
            type="email"
            value={values.email}
          />
          <TextField
            error={errors.password}
            label="Password"
            name="password"
            onChange={handleChange}
            required
            type="password"
            value={values.password}
          />
          <TextField
            error={errors.company}
            label="Company name"
            name="company"
            onChange={handleChange}
            required
            value={values.company}
          />
          <fieldset className="radio-group">
            <legend>
              Are you an Agency?<b>*</b>
            </legend>
            <label>
              <input defaultChecked name="agency" type="radio" />
              <span>Yes</span>
            </label>
            <label>
              <input name="agency" type="radio" />
              <span>No</span>
            </label>
          </fieldset>
        </form>
      </div>
      <Button form="signup-form" type="submit">
        Create Account
      </Button>
    </div>
  );
}
