import React, { useState } from "react";
import "./home.scss";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUsersQuery,
} from "../../context/api/userApi";
import { FaFemale, FaMale } from "react-icons/fa";
import EditModule from "../../components/editModule/EditModule";
import CreateModule from "../../components/createModule/CreateModule";

const Home = () => {
  const { data: allUsers } = useGetUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [editUser] = useEditUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(null);

  const handleDelete = (id) => {
    deleteUser(id);
  };

  const handleClose = () => {
    setShowEdit(null);
    setShowCreate(false);
  };

  return (
    <div className="container home">
      <button className="create-btn" onClick={() => setShowCreate(true)}>Create user</button>
      <div className="user__cards">
        {allUsers?.payload?.map((user) => (
          <div className="user" key={user._id}>
            <img src={user.url} className="user__img" alt="" />
            <div className="user__info">
              <h3>
                {user.fname} {user.lname}
              </h3>
              <div className="gender">
                <p>Gender</p>
                {user.gender === "male" ? (
                  <FaMale style={{ color: "blue" }} />
                ) : (
                  <FaFemale style={{ color: "red" }} />
                )}
              </div>
              <div className="user__btns">
                <button className="edit-btn" onClick={() => setShowEdit(user)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCreate && (
        <CreateModule
          onClose={() => setShowCreate(false)}
          onCreate={createUser}
        />
      )}
      {showEdit && (
        <EditModule
          user={showEdit}
          onClose={() => setShowEdit(null)}
          onEdit={editUser}
        />
      )}
      {showCreate || showEdit ? (
        <div onClick={handleClose} className="overlay"></div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
