import React from 'react';
import './style.css';

export default function Form({ placeholder, type, name }) {
  return (
    <div>
      <input className="formInput" type={type} name={name} placeholder={placeholder} />
    </div>
  );
}
