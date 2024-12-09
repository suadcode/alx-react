import { createSelector } from 'reselect';
import { Map } from 'immutable';

const getNotificationsState = (state) => state.notifications || Map();

export const filterTypeSelected = createSelector(
  [getNotificationsState],
  (notificationsState) => notificationsState.get('filter')
);

export const getNotifications = createSelector(
  [getNotificationsState],
  (notificationsState) => notificationsState.get('notifications') || Map()
);

export const getUnreadNotificationsByType = createSelector(
  [getNotifications, filterTypeSelected],
  (notifications, filter) => {
    const unreadNotifications = notifications.filter(notification => !notification.get('isRead'));

    if (filter === 'URGENT') {
      return unreadNotifications.filter(notification => notification.get('type') === 'urgent');
    }

    return unreadNotifications;
  }
);
