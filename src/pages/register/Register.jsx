import React, { useEffect, useState } from "react";
import { useCreateUserMutation } from "../../context/api/userApi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../context/slices/authSlice";
import "./register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    age: 0,
    url: "",
    gender: "",
    isActive: true,
    budget: 0,
  });
  const [registerUser, { data, isLoading, isSuccess }] =
    useCreateUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data?.payload?.token));
      dispatch(setUser(data?.payload?.user));
      navigate("/");
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fname"
          placeholder="First Name"
          onChange={handleChange}
          value={formData.fname}
        />
        <input
          type="text"
          name="lname"
          placeholder="Last Name"
          onChange={handleChange}
          value={formData.lname}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={formData.username}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          value={formData.age}
        />
        <input
          type="text"
          name="url"
          placeholder="Profile Image URL"
          onChange={handleChange}
          value={formData.url}
        />
        <select name="gender" onChange={handleChange} value={formData.gender}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <label>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={(e) =>
              setFormData({ ...formData, isActive: e.target.checked })
            }
          />
          {"   "}
          <span>Is Active</span>
        </label>
        <input
          type="number"
          name="budget"
          placeholder="Budget"
          onChange={handleChange}
          value={formData.budget}
        />
        <button type="submit">Register</button>
        <NavLink className={"active"} to={"/login"}>
          Already have an account?{" "}
          <span style={{ cursor: "pointer", color: "#007bff" }}>Login</span>
        </NavLink>
      </form>
    </div>
  );
};

export default Register;
