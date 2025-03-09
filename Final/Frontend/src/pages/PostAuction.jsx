import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostAuction() {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login'); // Redirect to Sign In if not authenticated
    }
  }, [navigate]);

  const handlePostAuction = async (e) => {
    e.preventDefault();

    // Validate fields before submitting
    if (!itemName || !description || !startingBid || !closingTime) {
      alert('All fields are required.');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('You must be signed in to post an auction.');
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5001/auction',
        { itemName, description, startingBid, closingTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Auction item posted successfully!');
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to post auction. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Post New Auction</h2>
      <form onSubmit={handlePostAuction}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <textarea
          placeholder="Item Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="number"
          placeholder="Starting Bid"
          value={startingBid}
          onChange={(e) => setStartingBid(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={closingTime}
          onChange={(e) => setClosingTime(e.target.value)}
          required
        />
        <button type="submit" className="post-btn">Post Auction</button>
      </form>
    </div>
  );
}

export default PostAuction;
