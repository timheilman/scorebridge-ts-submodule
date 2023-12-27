// export type DeleteTodoMutation = {
//   deleteTodo?:  {
//     __typename: "Todo",
//     id: string,
//     name: string,
//     description?: string | null,
//     createdAt: string,
//     updatedAt: string,
//   } | null,
// };
import { Club, ClubDevice } from "./graphql/appsync";

export interface DeleteClubDeviceMutation {
  deleteClubDevice?: ClubDevice | null;
}

export interface GetClubQuery {
  getClub?: Club | null;
}

// export type ListTodosQuery = {
//   listTodos?:  {
//     __typename: "ModelTodoConnection",
//     items:  Array< {
//       __typename: "Todo",
//       id: string,
//       name: string,
//       description?: string | null,
//       createdAt: string,
//       updatedAt: string,
//     } | null >,
//     nextToken?: string | null,
//   } | null,
// };
export interface ListClubDevicesQuery {
  listClubDevices?: {
    __typename: "ModelClubDeviceConnection";
    items: [ClubDevice | null]; // in @model-speak this is "items"
    nextToken?: string | null;
  } | null;
}
// TODO: SCOR-143 go back over this handling __typename the way it is in tutorial
// export type OnCreateTodoSubscription = {
//   onCreateTodo?:  {
//     __typename: "Todo",
//     id: string,
//     name: string,
//     description?: string | null,
//     createdAt: string,
//     updatedAt: string,
//   } | null,
// };

export interface OnCreateClubDeviceSubscription {
  onCreateClubDevice?: ClubDevice | null;
}
export interface OnUpdateClubDeviceSubscription {
  onUpdateClubDevice?: ClubDevice | null;
}
export interface OnDeleteClubDeviceSubscription {
  onDeleteClubDevice?: ClubDevice | null;
}
export interface OnUpdateClubSubscription {
  onUpdateClub?: Club | null;
}
