import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notifications from './Notifications';
import { fetchNotifications } from '../actions/notificationActionCreators';
import { getUnreadNotifications } from '../selectors/notificationSelector';

const NotificationsContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const notifications = useSelector(getUnreadNotifications);
  const isLoading = useSelector(state => state.ui.get('isLoading'));

  return (
    <Notifications
      listNotifications={notifications}
      isLoading={isLoading}
    />
  );
};

export default NotificationsContainer;
