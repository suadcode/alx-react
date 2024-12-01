import { normalize, schema } from 'normalizr';
import notifications from '../../../../notifications.json';

const user = new schema.Entity('users');
const message = new schema.Entity('messages', {}, { idAttribute: 'guid' });

const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
});

const normalizedData = normalize(notifications, [notification]);

export default function getAllNotificationsByUser(userId) {
  const contexts = [];
  const { notifications: notifEntities, messages } = normalizedData.entities;

  for (const notifId in notifEntities) {
    const notif = notifEntities[notifId];
    if (notif.author === userId) {
      contexts.push(messages[notif.context]);
    }
  }

  return contexts;
}

export function notificationsNormalizer(data) {
  return normalize(data, [notification]);
}

export { normalizedData };
