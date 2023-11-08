import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Form, Input } from "antd";
import React, { useState } from "react";

function SignUpForm() {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    firstName: "",
    lastName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { name, email, password } = formData;
    alert(
      `You are sign up with name: ${name} email: ${email} and password: ${password}`
    );

    for (const key in formData) {
      setFormData({
        ...formData,
        [key]: "",
      });
    }
  };

  return (
    <div className="form-container sign-up-container">
      <Form
        form={form}
        preserve={false}
        onFinish={handleOnSubmit}
        autoComplete="off"
      >
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
        </div>
        <span>or use your details for registration</span>
        <Form.Item
          name="First Name"
          style={{ width: "56vh", height: "3vh", marginBottom: "36px" }}
          rules={[
            {
              required: true,
              message: "Please enter your first name.",
            },
            {
              pattern: /^[A-Za-z\s]*$/,
              message: "Special characters and numbers are not allowed.",
            },
            {
              pattern: /^\S+$/,
              message: "White spaces are not allowed.",
            },
            {
              max: 30,
              message: "First name is too long.",
            },
          ]}
        >
          <Input
            className="input"
            style={{ height: "5vh" }}
            type="text"
            name="firstName"
            value={formData.firstName}
            prefix={<UserOutlined />}
            placeholder="First Name"
            onChange={handleInputChange}
            required
          />
        </Form.Item>
        <Form.Item
          name="Last Name"
          style={{ width: "56vh", height: "3vh", marginBottom: "36px" }}
          rules={[
            {
              required: true,
              message: "Please enter your last name.",
            },
            {
              pattern: /^[A-Za-z\s]*$/,
              message: "Special characters and numbers are not allowed.",
            },
            {
              pattern: /^\S+$/,
              message: "White spaces are not allowed.",
            },
            {
              max: 30,
              message: "Last name is too long.",
            },
          ]}
        >
          <Input
            type="text"
            className="input"
            name="lastName"
            style={{ height: "5vh" }}
            value={formData.lastName}
            prefix={<UserOutlined />}
            placeholder="Last Name"
            onChange={handleInputChange}
            required
          />
        </Form.Item>
        <Form.Item
          name="Email"
          style={{ width: "56vh", height: "3vh", marginBottom: "36px" }}
          rules={[
            {
              required: true,
              message: "Please enter your email address.",
            },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: `Invalid email address entered.`,
            },
            {
              pattern: /^\S+$/,
              message: "White spaces are not allowed.",
            },
          ]}
        >
          <Input
            type="email"
            className="input"
            style={{ height: "5vh" }}
            name="email"
            value={formData.email}
            prefix={<MailOutlined />}
            placeholder="Email"
            onChange={handleInputChange}
            required
          />
        </Form.Item>
        <Form.Item
          name="username"
          style={{ width: "56vh", height: "3vh", marginBottom: "36px" }}
          rules={[
            {
              required: true,
              message: "Please enter your username.",
            },
            {
              whitespace: true,
              message: "Please enter your username.",
            },
            {
              pattern: /^(?![^"=$\\'`*<>]*["=$\\'`*<>])/,
              message: `The following characters are not allowed: $ = " ' * \\ / > <`,
            },
            {
              pattern: /^\S+$/,
              message: "White spaces are not allowed.",
            },
            {
              max: 75,
              message: "Username is too long.",
            },
          ]}
        >
          <Input
            type="text"
            className="input"
            style={{ height: "5vh" }}
            placeholder="Username"
            prefix={<UserOutlined />}
            value={formData.username}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          name="Phone"
          style={{ width: "56vh", height: "3vh", marginBottom: "36px" }}
          rules={[
            {
              required: true,
              message: "Please enter your contact number.",
            },
            {
              pattern: /^(?![^"=$\\'`*<>]*["=$\\'`*<>])/,
              message: `The following characters are not allowed: $ = " ' * \\ / > <`,
            },
            {
              pattern: /^\S+$/,
              message: "White spaces are not allowed.",
            },
            {
              max: 10,
              message: "Contact number is too long.",
            },
          ]}
        >
          <Input
            type="number"
            className="input"
            style={{ height: "5vh" }}
            name="phone"
            value={formData.phone}
            prefix={<PhoneOutlined />}
            placeholder="Phone"
            onChange={handleInputChange}
            required
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
        <Form.Item
          name="confirmPassword"
          style={{ width: "56vh", height: "3vh", marginBottom: "36px" }}
          rules={[
            {
              required: true,
              message: "Please confirm password.",
            },
            {
              max: 75,
              message: "Password is too long.",
            },
            () => ({
              validator(_, value) {
                if (form.getFieldValue("password") === value) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(new Error("Passwords don't match."));
                }
              },
            }),
          ]}
        >
          <Input
            type="password"
            className="input"
            style={{ height: "5vh" }}
            name="confirmPassword"
            value={formData.confirmPassword}
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
            onChange={handleInputChange}
            required
          />
        </Form.Item>
        <button className="signup_button">Sign Up</button>
      </Form>
    </div>
  );
}

export default SignUpForm;
