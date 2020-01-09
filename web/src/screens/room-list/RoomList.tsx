import React, { ReactElement, useState, useContext } from "react";

import { Room, GenericResponse, User } from "../../utils/gql/models/types";
import RoomCard from "../../component/room-card/RoomCard";

import "./RoomList.scss";
import {
  useMutation,
  useSubscription,
  useQuery,
  useLazyQuery
} from "@apollo/react-hooks";
import { AppStateContext } from "./../../state/providers/AppStateProvider";

import {
  ADD_USER_TO_ROOM,
  NEW_USER_JOINED_ROOM,
  NEW_USER_LEFT_ROOM,
  GET_ROOM_USERS
} from "./../../utils/gql/queries/index";

export interface RoomListProps {
  roomList: Array<Room>;
}

export default function RoomList(props: RoomListProps): ReactElement {
  const {
    state,
    actions: { addUserToRoom, joinRoom, removeUserFromRoom, saveRooms }
  } = useContext(AppStateContext);

  const [selected, setSelected] = useState<string>(state.currentRoomId);

  const {
    data: newJoinedUserData,
    error: newJoinedUserError
  } = useSubscription<
    {
      newUserJoinedRoom: User;
    },
    {
      roomId: string;
    }
  >(NEW_USER_JOINED_ROOM, {
    variables: {
      roomId: selected
    }
  });

  const { data: newUserLeftData, error: newUserLeftError } = useSubscription<
    { newUserLeftRoom: User },
    { roomId: string }
  >(NEW_USER_LEFT_ROOM, {
    variables: {
      roomId: selected
    }
  });

  if (newJoinedUserData && selected) {
    addUserToRoom(newJoinedUserData.newUserJoinedRoom, selected);
  }

  if (newUserLeftData && selected) {
    removeUserFromRoom(newUserLeftData.newUserLeftRoom, selected);
  }

  newJoinedUserError && console.error(newJoinedUserError);

  const [addUserToRoomResponse, { data, error, loading }] = useMutation<
    { addUserToRoomResponse: GenericResponse },
    { roomId: string }
  >(ADD_USER_TO_ROOM);

  const selectedRoom = props.roomList.filter(room => room.id === selected)[0];
  const users = selectedRoom ? selectedRoom.users : null;

  const [
    roomUsers,
    { data: roomUsersData, error: roomUserErrors }
  ] = useLazyQuery<
    {
      roomUsers: Array<User>;
    },
    {
      roomId: string;
    }
  >(GET_ROOM_USERS);

  const handleSelection: (room: Room, idx: number) => void = async (
    room,
    idx
  ) => {
    console.log(`${room.name} selected`);
    roomUsers({
      variables: {
        roomId: room.id
      }
    });
    const newState = state;
    if (roomUsersData) {
      const allRoomUsers = roomUsersData.roomUsers;

      const updatedRooms = Object.values(state.allRooms).map(_room => {
        if (room.id === _room.id) {
          room.users = allRoomUsers;
        }
        return _room;
      });

      saveRooms(updatedRooms);
    }

    joinRoom(room.id);

    let { data, errors } = await addUserToRoomResponse({
      variables: {
        roomId: room.id
      }
    });
  };

  console.dir(state);
  return (
    <React.Fragment>
      <div className="room-list-container">
        {props.roomList
          // .filter(room => {
          //   return selected === "" ? true : room.id === selected;
          // })
          .map((room, idx) => (
            <RoomCard
              id={room.id}
              key={room.id}
              name={room.title}
              image={room.name}
              active={room.id === selected}
              textClass={
                "header-menu-primary " +
                (selected !== "" &&
                  (room.id === selected ? "visible" : "hidden"))
              }
              onExit={(): void => {
                setSelected("");
              }}
              onSelect={() => {
                handleSelection(room, idx);
              }}
            />
          ))}
      </div>
      {selected !== "" && (
        <div className="room-members-list">
          {users &&
            users.length > 0 &&
            users.map(user => {
              console.log(user);
              if (user) return <div className="user">{user.userName}</div>;
            })}
        </div>
      )}
    </React.Fragment>
  );
}
