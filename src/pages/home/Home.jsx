import React, { useState, useEffect } from "react";
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
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
} from "@mui/material";

const Home = () => {
  const [page, setPage] = useState(1);
  const [gender, setGender] = useState("all");

  const {
    data: allUsers,
    refetch,
    error,
  } = useGetUsersQuery({
    skip: page,
    gender,
    limit: 5,
  });
  const [createUser] = useCreateUserMutation();
  const [editUser] = useEditUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(null);

  useEffect(() => {
    refetch();
  }, [page, gender, refetch]);

  const handleDelete = (id) => {
    deleteUser(id);
  };

  const handleClose = () => {
    setShowEdit(null);
    setShowCreate(false);
  };

  console.log(error);
  useEffect(() => {
    if (error) {
      return <div className="no-users">{error?.data?.msg}</div>;
    }
  }, [error]);

  return (
    <div className="container home">
      <FormControl variant="outlined" className="gender-select">
        <InputLabel>Gender</InputLabel>
        <Select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          label="Gender"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>
      <button className="create-btn" onClick={() => setShowCreate(true)}>
        Create user
      </button>
      <div className="user__cards">
        {allUsers.payload.map((user) => (
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
                <button className="edit-btn" onClick={() => setShowEdit(user)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        count={Math.ceil(allUsers?.total / 5)}
        page={page}
        onChange={(e, value) => setPage(value)}
        color="primary"
        className="pagination"
      />

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
