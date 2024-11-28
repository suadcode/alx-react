import getAllNotificationsByUser from './notifications';
import normalizeNotifications from './normalizeNotifications';
import notifications from "../../../../notifications.json";

jest.mock("../../../../notifications.json", () => ([
  {
    "id": "5debd76480edafc8af244228",
    "author": {
      "id": "5debd764a7c57c7839d722e9",
      "name": {
        "first": "Poole",
        "last": "Sanders"
      },
      "email": "poole.sanders@holberton.nz",
      "picture": "http://placehold.it/32x32",
      "age": 25
    },
    "context": {
      "guid": "2d8e40be-1c78-4de0-afc9-fcc147afd4d2",
      "isRead": true,
      "type": "urgent",
      "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
    }
  },
  {
    "id": "5debd764507712e7a1307303",
    "author": {
      "id": "5debd7648ba8641ce0a34ea4",
      "name": {
        "first": "Norton",
        "last": "Grimes"
      },
      "email": "norton.grimes@holberton.nz",
      "picture": "http://placehold.it/32x32",
      "age": 37
    },
    "context": {
      "guid": "cec84b7a-7be4-4af0-b833-f1485433f66e",
      "isRead": false,
      "type": "urgent",
      "value": "ut labore et dolore magna aliqua. Dignissim convallis aenean et tortor at risus viverra adipiscing. Ac tortor dignissim convallis aenean et. "
    }
  },
  {
    "id": "5debd76444dd4dafea89d53b",
    "author": {
      "id": "5debd764a7c57c7839d722e9",
      "name": {
        "first": "Poole",
        "last": "Sanders"
      },
      "email": "poole.sanders@holberton.nz",
      "picture": "http://placehold.it/32x32",
      "age": 25
    },
    "context": {
      "guid": "280913fe-38dd-4abd-8ab6-acdb4105f922",
      "isRead": false,
      "type": "urgent",
      "value": "Non diam phasellus vestibulum lorem sed risus ultricies. Tellus mauris a diam maecenas sed"
    }
  },
  {
    "id": "5debd7642e815cd350407777",
    "author": {
      "id": "5debd764f8452ef92346c772",
      "name": {
        "first": "John",
        "last": "Doe"
      },
      "email": "john.doe@example.com",
      "picture": "http://placehold.it/32x32",
      "age": 30
    },
    "context": {
      "guid": "3068c575-d619-40af-bf12-dece1ee18dd3",
      "isRead": false,
      "type": "default",
      "value": "Cursus risus at ultrices mi."
    }
  }
]));

describe('getAllNotificationsByUser', () => {
  it('should return the correct context objects for user ID 5debd764a7c57c7839d722e9', () => {
    const userId = "5debd764a7c57c7839d722e9";
    const expectedContexts = [
      {
        "guid": "2d8e40be-1c78-4de0-afc9-fcc147afd4d2",
        "isRead": true,
        "type": "urgent",
        "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
      },
      {
        "guid": "280913fe-38dd-4abd-8ab6-acdb4105f922",
        "isRead": false,
        "type": "urgent",
        "value": "Non diam phasellus vestibulum lorem sed risus ultricies. Tellus mauris a diam maecenas sed"
      }
    ];

    const contexts = getAllNotificationsByUser(userId);
    expect(contexts).toEqual(expectedContexts);
  });

  it('should return the correct normalized result array', () => {
    const normalizedData = normalizeNotifications(notifications);
    const expectedResultArray = [
      "5debd76480edafc8af244228",
      "5debd764507712e7a1307303",
      "5debd76444dd4dafea89d53b",
      "5debd7642e815cd350407777"
    ];

    expect(normalizedData.result).toEqual(expectedResultArray);
  });

  it('should return the correct normalized user entity', () => {
    const normalizedData = normalizeNotifications(notifications);
    const userId = "5debd764a7c57c7839d722e9";
    const expectedUser = {
      age: 25,
      email: "poole.sanders@holberton.nz",
      id: userId,
      name: { first: "Poole", last: "Sanders" },
      picture: "http://placehold.it/32x32"
    };

    expect(normalizedData.entities.users[userId]).toEqual(expectedUser);
  });

  it('should return the correct normalized message entity', () => {
    const normalizedData = normalizeNotifications(notifications);
    const messageGuid = "3068c575-d619-40af-bf12-dece1ee18dd3";
    const expectedMessage = {
      guid: messageGuid,
      isRead: false,
      type: "default",
      value: "Cursus risus at ultrices mi."
    };

    expect(normalizedData.entities.messages[messageGuid]).toEqual(expectedMessage);
  });

  it('should return the correct normalized notification entity', () => {
    const normalizedData = normalizeNotifications(notifications);
    const notificationId = "5debd7642e815cd350407777";
    const expectedNotification = {
      author: "5debd764f8452ef92346c772",
      context: "3068c575-d619-40af-bf12-dece1ee18dd3",
      id: notificationId
    };

    expect(normalizedData.entities.notifications[notificationId]).toEqual(expectedNotification);
  });
});
