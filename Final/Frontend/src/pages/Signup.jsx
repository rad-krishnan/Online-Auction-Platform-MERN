import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signup } from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

//import "../styles.css";

const signupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  dob: yup.date().required("Date of Birth is required"),
  mobile: yup.string().matches(/^\d{10}$/, "Mobile number must be 10 digits").required("Mobile number is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });
  
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Sending Signup Data:", data);
    try {
      const res = await axios.post("http://localhost:5001/signup", data, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Signup Successful");
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Signup Failed");
    }
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
    </div>
  );
};

export default Signup;
