import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login'); // Redirect to Sign In if not authenticated
      return;
    }

    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:5001/auctions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(res.data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };
    
    fetchItems();
  }, [navigate]);

  // 🔹 Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token
    navigate('/login'); // Redirect to Sign In page
  };

  return (
    <div className="dashboard-container">
      <h2>Auction Dashboard</h2>
      
      {/* 🔹 Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <Link to="/post-auction">
        <button className="post-auction-btn">Post New Auction</button>
      </Link>

      <ul className="auction-list">
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item._id} className="auction-item">
              <Link to={`/auction/${item._id}`}>
                {item.itemName} - Current Bid: ${item.currentBid} {item.isClosed ? '(Closed)' : ''}
              </Link>
            </li>
          ))
        ) : (
          <p>No auctions available.</p>
        )}
      </ul>
    </div>
  );
}

export default Dashboard;
