
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ width: '250px', height: '100vh', backgroundColor: 'black', padding: '20px' }}>
      <h3>Sidebar</h3>
      <ul>
        <li><Link to="/config">Config</Link></li>
        <li><Link to="/checkpage">CheckPage</Link></li>
        <li><Link to="/create-pro-note">Create Pro Note</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
