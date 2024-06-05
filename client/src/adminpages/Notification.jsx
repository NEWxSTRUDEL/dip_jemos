// Notification.js
import React from 'react';
import './stylesnotification.css';

const Notification = ({ show }) => {
  return (
    <div className={`notification ${show ? 'show' : ''}`}>
      Вы скопировали
    </div>
  );
};

export default Notification;
