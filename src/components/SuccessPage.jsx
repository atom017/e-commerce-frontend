// src/pages/SuccessPage.tsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session_id');

    if (sessionId) {
      // You can call your backend here to confirm the payment status
      console.log('Session ID:', sessionId);
    }
  }, [location]);

  return <div>Thank you for your purchase! Your payment was successful.</div>;
};

export default SuccessPage;
