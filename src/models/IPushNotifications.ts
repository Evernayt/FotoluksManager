export interface IPushNotifications {
  addedOrRemovedFromMembers: { value: boolean; id: 1 };
  taskComments: { value: boolean; id: 2 };
  taskStatusChanged: { value: boolean; id: 3 };
  orderStatusChanged: { value: boolean; id: 4 };
  orderChanged: { value: boolean; id: 5 };
}
