import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ, SET_TYPE_FILTER } from '../actions/notificationActionTypes';

const initialState = {
  notifications: [],
  filter: "DEFAULT"
};

export const fetchNotificationsSuccess = (data) => {
  const notificationsWithIsRead = data.map(notification => ({
    ...notification,
    isRead: false
  }));
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    data: notificationsWithIsRead
  };
};

export const markAsRead = (index) => {
  return {
    type: MARK_AS_READ,
    index
  };
};

export const setTypeFilter = (filter) => {
  return {
    type: SET_TYPE_FILTER,
    filter
  };
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.data,
      };
    case MARK_AS_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.index
            ? { ...notification, isRead: true }
            : notification
        )
      };
    case SET_TYPE_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    default:
      return state;
  }
}

export default notificationReducer;
