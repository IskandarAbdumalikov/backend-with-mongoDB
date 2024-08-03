import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const EditModule = ({ user, onClose, onEdit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: user,
  });

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  const onSubmit = (data) => {
    const { _id, __v, ...formDataWithoutIdAndV } = data;
    onEdit({ id: _id, body: formDataWithoutIdAndV });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("fname", { required: "First name is required" })}
          />
          {errors.fname && <div className="error">{errors.fname.message}</div>}

          <input
            type="text"
            {...register("lname", { required: "Last name is required" })}
          />
          {errors.lname && <div className="error">{errors.lname.message}</div>}

          <input
            type="text"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <div className="error">{errors.username.message}</div>
          )}

          <input
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <div className="error">{errors.password.message}</div>
          )}

          <input
            type="number"
            {...register("age", {
              required: "Age is required",
              valueAsNumber: true,
            })}
          />
          {errors.age && <div className="error">{errors.age.message}</div>}

          <input type="text" {...register("url")} />

          <select {...register("gender", { required: "Gender is required" })}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <div className="error">{errors.gender.message}</div>
          )}

          <input
            type="number"
            {...register("budget", {
              required: "Budget is required",
              valueAsNumber: true,
            })}
          />
          {errors.budget && (
            <div className="error">{errors.budget.message}</div>
          )}

          <button type="submit">Save Changes</button>
          <button style={{ background: "red" }} onClick={onClose} type="button">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModule;
