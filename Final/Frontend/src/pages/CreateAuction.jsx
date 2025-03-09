import React, { useState } from "react";
import { createAuction } from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const CreateAuction = () => {
  const [form, setForm] = useState({ itemName: "", description: "", startingBid: "", closingTime: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAuction(form);
      toast.success("Auction created successfully!");
      navigate("/auctions");
    } catch (error) {
      toast.error("Error creating auction");
    }
  };

  return (
    <div className="form-container">
      <h2>Create Auction</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="itemName" placeholder="Item Name" onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
        <input type="number" name="startingBid" placeholder="Starting Bid" onChange={handleChange} required />
        <input type="datetime-local" name="closingTime" onChange={handleChange} required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateAuction;
