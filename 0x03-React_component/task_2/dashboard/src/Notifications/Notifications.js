import React, { Component } from "react";
import "./Notifications.css";
import closeIcon from '../assets/close-icon.png';
import NotificationItem from "./NotificationItem";
import PropTypes from 'prop-types';


class Notifications extends Component {
  constructor(props) {
    super(props);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.markAsRead = this.markAsRead.bind(this);
  }
  handleCloseClick() {
    console.log("Close button has been clicked");
  }
  markAsRead(id) {
    typeof (id) === 'number' && console.log(`Notification ${id} has been marked as read`)
  }

  render() {
    const { displayDrawer } = this.props;

    return (
      <>
        <div className="menuItem">
          Your notifications
        </div>
        {displayDrawer && (<div className="Notifications">
          <p>Here is the list of notifications</p>
          <ul>
            <NotificationItem type="default" value="New course available" markAsRead={this.markAsRead} />
            <NotificationItem type="urgent" value="New resume available" markAsRead={this.markAsRead} />
            <NotificationItem
              type="urgent"
              html={{ __html: '<strong>Urgent requirement</strong> - complete by EOD' }}
              markAsRead={this.markAsRead}
            />
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
        </div>)}
      </>
    );
  }

}
Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
};

Notifications.defaultProps = {
  displayDrawer: false,
};


export default Notifications;
