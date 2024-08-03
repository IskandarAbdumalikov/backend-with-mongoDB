import React, { useState } from "react";
import "./singleUser.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUserByIdQuery,
} from "../../context/api/userApi";
import EditModule from "../../components/editModule/EditModule";

const SingleUser = () => {
  const { userId } = useParams();
  const { data } = useGetUserByIdQuery(userId);
  const [showEdit, setShowEdit] = useState(null);
  const [editUser] = useEditUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  let navigate = useNavigate();
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
      navigate("/");
    }
  };

  const handleClose = () => {
    setShowEdit(null);
  };

  if (!data) return <div>Loading...</div>;

  const { age, budget, fname, gender, lname, url } = data?.payload;

  return (
    <div className="single-user container">
      <div className="single-user__left">
        <img src={url} alt={`${fname} ${lname}`} className="user-avatar" />
      </div>
      <div className="single-user__right">
        <h2>
          {fname} {lname}
        </h2>
        <p>
          <strong>Age:</strong> {age}
        </p>
        <p>
          <strong>Gender:</strong> {gender}
        </p>
        <p>
          <strong>Budget:</strong> ${budget}
        </p>
        <button className="edit-btn" onClick={() => setShowEdit(data?.payload)}>
          Edit
        </button>
        <button
          className="delete-btn"
          onClick={() => handleDelete(data?.payload?._id)}
        >
          Delete
        </button>
      </div>
      {showEdit && (
        <EditModule
          user={showEdit}
          onClose={() => setShowEdit(null)}
          onEdit={editUser}
        />
      )}
    </div>
  );
};

export default SingleUser;
