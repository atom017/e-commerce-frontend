// src/utils/auth.js
export const fetchUserFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Assuming JWT contains user data
        const decodedUser = JSON.parse(atob(token.split('.')[1])); // Decoding JWT (e.g., if using JWT)
        return { user: decodedUser, token }; // Return user data and token
      } catch (error) {
        console.error("Failed to decode user token", error);
        return null;
      }
    }
    return null;
  };
  