import React, { useState } from 'react';

function Delete() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUpdateClick = () => {
    
    console.log('Updated email:', email);
  };

  return (
    <div>
      <h2>delete</h2>
      <form onSubmit={handleUpdateClick} action='/delete' method='DELETE'>
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

export default Delete;
