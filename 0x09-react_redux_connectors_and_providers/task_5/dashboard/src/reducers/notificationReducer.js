import { fromJS, Map } from 'immutable';
import { FETCH_NOTIFICATIONS_SUCCESS, SET_TYPE_FILTER, MARK_AS_READ, SET_LOADING_STATE, SET_NOTIFICATIONS } from '../actions/notificationActionTypes';
import { notificationsNormalizer } from '../schema/notifications';

const initialState = Map({
  notifications: Map(),
  filter: 'DEFAULT',
  isLoading: false
});

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      const normalizedData = notificationsNormalizer(action.data);
      const normalizedNotifications = fromJS(normalizedData.entities.notifications);
      return state.merge({
        notifications: normalizedNotifications,
        isLoading: false
      });

    case SET_NOTIFICATIONS:
      return state.set('notifications', fromJS(action.notifications));

    case SET_TYPE_FILTER:
      return state.set('filter', action.filter);

    case MARK_AS_READ:
      return state.setIn(['notifications', String(action.index), 'isRead'], true);

    case SET_LOADING_STATE:
      return state.set('isLoading', action.isLoading);

    default:
      return state;
  }
};

export default notificationReducer;
