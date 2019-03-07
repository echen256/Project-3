import React from 'react';
import './style.css';

function Nav({ children }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounded">
      <div>
        <div>
          <a className="navbar-brand" href="/">
            {children}
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
