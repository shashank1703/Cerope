import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { HiPencil, HiCog } from 'react-icons/hi';
import axios from 'axios';

export default function UserProfile() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user profile data from backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token not found');
          setLoading(false);
          return;
        }

        // Fetch user data from backend
        const response = await axios.get('/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('User profile data:', response.data);
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load profile data');
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading profile data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Error Loading Profile</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Format date from ISO string if available
  const formatDate = (dateString) => {
    if (!dateString) return { day: '', month: '', year: '' };
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return { day: '', month: '', year: '' };
    
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: (date.getMonth() + 1).toString().padStart(2, '0'),
      year: date.getFullYear().toString()
    };
  };

  // Get formatted date parts
  const dobParts = formatDate(userData.dob);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        
        <div className="bg-white rounded-2xl shadow p-8">
          {/* Personal Details Section */}
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Personal Details</h2>
              
              {/* Desktop: Edit button / Mobile: Settings button */}
              <button 
                onClick={toggleEditMode}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <span className="md:block hidden">Edit</span>
                <HiPencil className="md:block hidden h-5 w-5" />
                <span className="md:hidden block">Settings</span>
                <HiCog className="md:hidden block h-5 w-5" />
              </button>
            </div>
            
            {/* Content layout - changes based on screen size */}
            <div className="md:grid md:grid-cols-3 md:gap-8">
              {/* Profile picture - moves to top on mobile */}
              <div className="md:col-span-1 flex flex-col items-center justify-center order-first md:order-last mb-8 md:mb-0">
                <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden mb-4">
                  <img 
                    src={userData.profilePicture || "/avatar_nav.png"} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="flex items-center gap-2 text-gray-600 border border-gray-300 rounded-md px-3 py-1.5">
                  <span>Change Profile Picture</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              {/* Form fields - full width on mobile */}
              <div className="md:col-span-2 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-8 space-y-6 md:space-y-0">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    First Name
                  </label>
                  <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-gray-700">
                    {userData.firstName || ''}
                  </div>
                </div>
                
                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Last Name
                  </label>
                  <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-gray-700">
                    {userData.lastName || ''}
                  </div>
                </div>
                
                {/* Email ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Email ID
                  </label>
                  <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-gray-700">
                    {userData.email || ''}
                  </div>
                </div>
                
                {/* Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Number
                  </label>
                  <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-gray-700">
                    {userData.phoneNumber || ''}
                  </div>
                </div>
                
                {/* Style Preference (instead of Gender) */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Style Preference
                  </label>
                  <div className="flex items-center space-x-6 mt-1">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="h-4 w-4 text-blue-600"
                        checked={userData.stylePreference === 'Men'}
                        readOnly
                      />
                      <span className="ml-2 text-sm text-gray-700">Men</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="h-4 w-4 text-blue-600"
                        checked={userData.stylePreference === 'Women'}
                        readOnly
                      />
                      <span className="ml-2 text-sm text-gray-700">Women</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="h-4 w-4 text-blue-600"
                        checked={userData.stylePreference === 'Both'}
                        readOnly
                      />
                      <span className="ml-2 text-sm text-gray-700">Both</span>
                    </label>
                  </div>
                </div>
                
                {/* DOB */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    DOB
                  </label>
                  <div className="flex space-x-2">
                    <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-gray-700 w-1/3 text-center">
                      {dobParts.day}
                    </div>
                    <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-gray-700 w-1/3 text-center">
                      {dobParts.month}
                    </div>
                    <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-gray-700 w-1/3 text-center">
                      {dobParts.year}
                    </div>
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Country
                  </label>
                  <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-gray-700">
                    {userData.country || ''}
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    City
                  </label>
                  <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-gray-700">
                    {userData.city || ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}