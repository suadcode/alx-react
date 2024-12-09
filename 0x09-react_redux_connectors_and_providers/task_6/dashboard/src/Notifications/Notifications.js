import React, { useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import { getUnreadNotifications } from '../selectors/notificationSelector';

const Notifications = ({
  displayDrawer,
  listNotifications,
  handleDisplayDrawer,
  handleHideDrawer,
  markAsRead,
}) => {
  useEffect(() => {
    // Fetch unread notifications on component mount
    handleDisplayDrawer();
    getUnreadNotifications();
  }, [handleDisplayDrawer]);

  const handleCloseClick = () => {
    console.log('Close button has been clicked');
    handleHideDrawer();
  };

  return (
    <>
      <div className={css(styles.menuItem)} onClick={handleDisplayDrawer}>
        Your notifications
      </div>
      {displayDrawer && (
        <div className={css(styles.notifications)}>
          <p>Here is the list of notifications</p>
          <ul className={css(styles.notificationList)}>
            {listNotifications.map(notification => (
              <NotificationItem
                key={notification.id}
                {...notification}
                markAsRead={markAsRead}
              />
            ))}
          </ul>
          <button
            className={css(styles.closeButton)}
            aria-label="Close"
            onClick={handleCloseClick}
          >
            <img src={closeIcon} alt="close icon" className={css(styles.closeIcon)} />
          </button>
        </div>
      )}
    </>
  );
};

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.string,
      html: PropTypes.shape({
        __html: PropTypes.string,
      }),
    })
  ).isRequired,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markAsRead: PropTypes.func.isRequired,
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
};

const styles = StyleSheet.create({
  notifications: {
    border: '1px dashed red',
    padding: '5px',
    position: 'relative',
  },
  notificationList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  closeIcon: {
    width: '16px',
    height: '16px',
    position: 'absolute',
    top: '-15px',
    right: '-15px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
});

export default Notifications;
