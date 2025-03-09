import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signin } from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

//import "../styles.css";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { data: response } = await signin(data);
      localStorage.setItem("token", response.token);
      toast.success("Login successful!");
      navigate("/auctions");
    } catch (error) {
      toast.error("Invalid credentials");
    }
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
    </div>
  );
};

export default Login;
