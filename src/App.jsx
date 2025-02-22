import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./styles.css";

const signupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  dob: yup.date().required("Date of Birth is required"),
  mobile: yup
    .string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });

  const onSubmit = (data) => {
    console.log("Signup Data:", data);
    alert("Signup Successful");
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Name" {...register("name")} />
        <p>{errors.name?.message}</p>

        <input type="email" placeholder="Email" {...register("email")} />
        <p>{errors.email?.message}</p>

        <input type="date" {...register("dob")} />
        <p>{errors.dob?.message}</p>

        <input type="text" placeholder="Mobile Number" {...register("mobile")} />
        <p>{errors.mobile?.message}</p>

        <input type="password" placeholder="Password" {...register("password")} />
        <p>{errors.password?.message}</p>

        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    alert("Login Successful");
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Email" {...register("email")} />
        <p>{errors.email?.message}</p>

        <input type="password" placeholder="Password" {...register("password")} />
        <p>{errors.password?.message}</p>

        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Signup</Link></p>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
