import User from "./User";
import { useState } from "react";
import UserDetails from "./UserDetails";
import UserCreate from "./UserCreate";
import * as userService from "../services/userService";
import DeleteUserOverlay from "./DeleteUserOverlay";
import UserEdit from "./UserEdit";

export default function UserList({
  users,
  onDelete,
  onUserCreateSubmit,
  onUserEditSubmit,
}) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [addUser, setAddUser] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [editedUserValues, setEditedUserValues] = useState(null);

  function onEditedUserChange(e) {
    setEditedUserValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  function closeDeleteDialog() {
    setUserToDelete(null);
  }

  const onInfoClick = async (userId) => {
    const user = await userService.getOne(userId);

    setSelectedUser(user);
  };

  const onDeleteClick = async (userId) => {
    setUserToDelete(userId);
  };

  const onClose = () => {
    setSelectedUser(null);
  };

  function toggleAddUserWindow() {
    setAddUser((current) => !current);
  }

  function onUserCreateSubmitHandler(e) {
    onUserCreateSubmit(e);
    toggleAddUserWindow();
  }

  function onUserEditClick(userToEdit) {
    setEditedUserValues(userToEdit);
  }

  function onUserEditClose() {
    console.log("dsadsad");
    setEditedUserValues(null);
  }

  return (
    <>
      {selectedUser && <UserDetails {...selectedUser} onClose={onClose} />}
      {addUser && (
        <UserCreate
          toggleAddUserWindow={toggleAddUserWindow}
          onUserCreateSubmit={onUserCreateSubmitHandler}
        ></UserCreate>
      )}
      {userToDelete && (
        <DeleteUserOverlay
          closeDeleteDialog={closeDeleteDialog}
          _id={userToDelete}
          onDelete={onDelete}
        ></DeleteUserOverlay>
      )}
      {editedUserValues && (
        <UserEdit
          onUserEditClose={onUserEditClose}
          onUserEditSubmit={onUserEditSubmit}
          editedUserValues={editedUserValues}
          onEditedUserChange={onEditedUserChange}
        ></UserEdit>
      )}

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>
                First name
                <svg
                  className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th>
                Last name
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </th>
              <th>
                Email
                <svg
                  className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th>
                Phone
                <svg
                  className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th>
                Created
                <svg
                  className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User
                key={user._id}
                user={user}
                onInfoClick={onInfoClick}
                onDeleteClick={onDeleteClick}
                onUserEditClick={onUserEditClick}
                editedUserValues={editedUserValues}
              ></User>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn-add btn" onClick={toggleAddUserWindow}>
        Add new user
      </button>
    </>
  );
}
