import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  FETCH_NOTIFICATIONS_SUCCESS,
  SET_LOADING_STATE
} from './notificationActionTypes';

export const markAsRead = (notificationId) => ({
  type: MARK_AS_READ,
  notificationId,
});

export const setTypeFilter = (filter) => ({
  type: SET_TYPE_FILTER,
  filter,
});

export const setLoadingState = (isLoading) => ({
  type: SET_LOADING_STATE,
  isLoading,
});

export const fetchNotifications = () => async (dispatch) => {
  dispatch(setLoadingState(true));
  try {
    const response = await fetch('/api/notifications');
    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }

    const notifications = await response.json();
    dispatch({
      type: FETCH_NOTIFICATIONS_SUCCESS,
      notifications,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
  } finally {
    dispatch(setLoadingState(false));
  }
};
