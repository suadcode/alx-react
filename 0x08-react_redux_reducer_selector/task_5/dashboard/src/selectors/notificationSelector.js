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

export const getUnreadNotifications = createSelector(
  [getNotifications],
  (notifications) => notifications.filter(notification => !notification.get('isRead'))
);
