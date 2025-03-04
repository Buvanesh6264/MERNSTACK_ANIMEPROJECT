import React from 'react';
// import { useNavigate } from 'react-router-dom';

function NotFound() {
//   const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ fontSize: '3rem', color: 'red' }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      {/* <button 
        onClick={() => navigate('/')} 
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Go to Home
      </button> */}
    </div>
  );
}

export default NotFound;
