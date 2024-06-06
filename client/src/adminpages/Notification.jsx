// Notification.js
import React from 'react';
import './stylesnotification.css';

const Notification = ({ show, message }) => {
  return (
    <div className={`notification ${show ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default Notification;
