import React, { useState } from 'react';

function Update() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUpdateClick = () => {
    
    console.log('Updated email:', email);
  };

  return (
    <div>
      <h2>Update</h2>
      <form onSubmit={handleUpdateClick} action='/update' method='PUT'>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button type="button" >
          Get all details
        </button>
      </form>
    </div>
  );
}

export default Update;
