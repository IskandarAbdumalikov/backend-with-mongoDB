import React from "react";
import { useForm } from "react-hook-form";

const CreateModule = ({ onClose, onCreate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fname: "",
      lname: "",
      username: "",
      password: "",
      age: "",
      url: "",
      gender: "",
      isActive: true,
      budget: "",
    },
  });

  const onSubmit = (data) => {
    onCreate(data);
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
            placeholder="First Name"
          />
          {errors.fname && <div className="error">{errors.fname.message}</div>}

          <input
            type="text"
            {...register("lname", { required: "Last name is required" })}
            placeholder="Last Name"
          />
          {errors.lname && <div className="error">{errors.lname.message}</div>}

          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            placeholder="Username"
          />
          {errors.username && (
            <div className="error">{errors.username.message}</div>
          )}

          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
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
            placeholder="Age"
          />
          {errors.age && <div className="error">{errors.age.message}</div>}

          <input
            type="text"
            {...register("url")}
            placeholder="Profile Image URL"
          />

          <select {...register("gender", { required: "Gender is required" })}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
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
            placeholder="Budget"
          />
          {errors.budget && (
            <div className="error">{errors.budget.message}</div>
          )}

          <button type="submit">Create</button>
          <button style={{ background: "red" }} onClick={onClose} type="button">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateModule;
