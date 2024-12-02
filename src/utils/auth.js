// src/utils/auth.js
export const fetchUserFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token) {
      try {
        // Assuming JWT contains user data
        const decodedUser = JSON.parse(atob(token.split('.')[1])); // Decoding JWT (e.g., if using JWT)
        const parsedUser = JSON.parse(user);
        return { user: parsedUser, token }; // Return user data and token
      } catch (error) {
        console.error("Failed to decode user token", error);
        return null;
      }
    }
    return null;
  };
  