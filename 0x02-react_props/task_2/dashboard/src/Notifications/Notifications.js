import React from "react";
import "./Notifications.css";
import closeIcon from './close-icon.png';
import NotificationItem from "./NotificationItem";

export default function Notifications() {
  const handleCloseClick = () => {
    console.log("Close button has been clicked");
  };

  return (
    <div className="Notifications">
      <p>Here is the list of notifications</p>
      <ul>
        <NotificationItem />
      </ul>
      <button
        style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label="Close"
        onClick={handleCloseClick}
      >
        <img src={closeIcon} alt="close icon" />
      </button>
    </div>
  );
}
