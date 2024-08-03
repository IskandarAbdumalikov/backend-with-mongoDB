import React, { useState, useEffect } from "react";
import "./home.scss";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUsersQuery,
} from "../../context/api/userApi";
import { FaFemale, FaMale, FaRobot } from "react-icons/fa";
import EditModule from "../../components/editModule/EditModule";
import CreateModule from "../../components/createModule/CreateModule";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../context/slices/authSlice";

const Home = () => {
  const [page, setPage] = useState(1);
  const [gender, setGender] = useState("all");
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [usernameError, setUsernameError] = useState("");

  const {
    data: allUsers,
    refetch,
    error,
  } = useGetUsersQuery({
    skip: page,
    gender,
    limit: 5,
  });
  const [createUser, { error: createdUserError }] = useCreateUserMutation();
  const [editUser, { error: editedUserError }] = useEditUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(null);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    if (createdUserError) {
      alert(createdUserError?.data?.msg);
    }
  }, [createdUserError]);

  useEffect(() => {
    if (editedUserError && editedUserError.data.msg.includes("username")) {
      setUsernameError(editedUserError.data.msg);
    }
  }, [editedUserError]);

  console.log(error);
  if (error?.data?.msg === "Unauthorized") {
    handleLogout();
  }

  useEffect(() => {
    refetch();
  }, [page, gender, refetch]);

  const handleDelete = () => {
    deleteUser(deleteUserId);
    setDeleteUserId(null);
  };

  const handleClose = () => {
    setShowEdit(null);
    setShowCreate(false);
  };

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
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>
      <button className="create-btn" onClick={() => setShowCreate(true)}>
        Create user
      </button>
      <div className="user__cards">
        {error ? (
          <div className="no-users">
            {error?.data?.msg || "An error occurred"}
          </div>
        ) : allUsers?.payload?.length > 0 ? (
          allUsers.payload.map((user) => (
            <div className="user" key={user._id}>
              <Link to={`/${user._id}`}>
                <img src={user.url} className="user__img" alt="" />
              </Link>
              <div className="user__info">
                <h3>
                  {user.fname} {user.lname}
                </h3>
                <div className="gender">
                  <p>Gender</p>
                  {user.gender === "male" ? (
                    <FaMale style={{ color: "blue" }} />
                  ) : user.gender === "female" ? (
                    <FaFemale style={{ color: "red" }} />
                  ) : (
                    <FaRobot />
                  )}
                </div>
                <div className="user__btns">
                  <button
                    className="edit-btn"
                    onClick={() => setShowEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => setDeleteUserId(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-users">Users not found</div>
        )}
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
      ) : null}

      <Dialog
        open={deleteUserId !== null}
        onClose={() => setDeleteUserId(null)}
      >
        <DialogTitle>
          {"Are you sure you want to delete this user?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting this user cannot be undone. Please confirm if you want to
            proceed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteUserId(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={usernameError !== ""} onClose={() => setUsernameError("")}>
        <DialogTitle>{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{usernameError}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setUsernameError("")}
            color="primary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
