import React from 'react';
import PropTypes from 'prop-types';

const NotificationItem = ({ type, html, value }) => {
  return (
    <li data-notification-type={type} dangerouslySetInnerHTML={html ? { __html: html } : undefined}>
      {!html && value}
    </li>
  );
};

NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  html: PropTypes.string,
  value: PropTypes.string,
};

NotificationItem.defaultProps = {
  html: null,
  value: null,
};

export default NotificationItem;
