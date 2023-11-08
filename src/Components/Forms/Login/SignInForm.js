import React, { useState } from "react";
import {
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Form, Input } from "antd";

function SignInForm() {
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { email, password } = formData;
    alert(`You are login with email: ${email} and password: ${password}`);

    for (const key in formData) {
      setFormData({
        ...formData,
        [key]: "",
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <Form
          initialValues={{
            remember: true,
          }}
          onFinish={handleOnSubmit}
          autoComplete="off"
        >
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
        </div>
        <span>or use your account</span>
        <Form.Item
          name="userID"
          style={{ width: "56vh", height: "3vh", marginBottom: "36px" }}
          rules={[
            {
              required: true,
              message: "Please enter your username or email address.",
            },
            {
              whitespace: true,
              message: "Please enter your username or email address.",
            },
            {
              validator: (rule, value) => {
                if (!value) {
                  return Promise.resolve();
                }
        
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                const usernameRegex = /^(?![^"=$\\'`*<>]*["=$\\'`*<>])^\S{1,75}$/;
        
                if (emailRegex.test(value) || usernameRegex.test(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    "Invalid username or email address. Please check for special characters and length."
                  );
                }
              },
            },
            {
              pattern: /^\S+$/,
              message: "White spaces are not allowed.",
            },
            {
              max: 75,
              message: "Provied text too long.",
            },
          ]}
        >
          <Input
            type="text"
            className="input"
            style={{ height: "5vh" }}
            placeholder="Username or Email Address"
            prefix={<UserOutlined />}
            value={formData.username}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          name="password"
          style={{ width: "56vh", height: "3vh", marginBottom: "36px" }}
          rules={[
            {
              required: true,
              message: "Please provide password.",
            },
            {
              min: 8,
              message: "Password must have at least 8 characters.",
            },
            {
              pattern: /^(?!\s)\S+/,
              message: "Password cannot start with a white space.",
            },
            {
              max: 75,
              message: "Password is too long.",
            },
          ]}
        >
          <Input
            type="password"
            className="input"
            name="password"
            style={{ height: "5vh" }}
            value={formData.password}
            prefix={<LockOutlined />}
            placeholder="Password"
            onChange={handleInputChange}
            required
          />
        </Form.Item>
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </Form>
    </div>
  );
}

export default SignInForm;
