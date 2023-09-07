import React, { useState } from 'react';

function Getalldata() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUpdateClick = () => {
    
    console.log('Updated email:', email);
  };

  return (
    <div>
      <h2>get all data</h2>
      <form onSubmit={handleUpdateClick} action='/get_customer_list' method='GET'>
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

export default Getalldata;
