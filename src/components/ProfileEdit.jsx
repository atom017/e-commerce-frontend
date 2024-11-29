import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Get user data from Redux
import { useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios'; // To make requests to the backend

const ProfileEdit = () => {
  const user = useSelector((state) => state.user.user); // Get user from Redux
  const navigate = useNavigate();
  const baseURI = import.meta.env.VITE_API_BASE_URI;
  
  // Local state for form fields
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // API call to update user profile
      await axios.put(`${baseURI}/user/updateprofile`, {
        username,
        password,
        newPassword,
      });
      
      alert('Profile updated successfully');
      navigate('/profile'); // Redirect to profile page after update
    } catch (error) {
      alert('Error updating profile');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 w-full rounded border"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">Current Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 w-full rounded border"
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-2 w-full rounded border"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 w-full rounded border"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded mt-4">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
