import React, { Component, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

export default class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      dateofbirth: "",
      errors: {
        email: "",
        password: "",
        name: "",
        dateofbirth: "",
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  //Validates if the inputs fit
  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.validateForm(this.state.errors) === false) {
      e.stopPropagation();
    }

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      dateofbirth: this.state.dateofbirth,
      score: 0,
      debts: [],
      requests: [],
      credits: [],
    };

    const url = "http://localhost:9000/register";
    axios
      .post(url, { user })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
        console.log(user);
      });
  };

  handleInputChange = (e) => {
    var validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );

    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;
    var today = new Date();
    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value)
          ? ""
          : "You must enter a valid email.";
        break;
      case "password":
        errors.password =
          value.length < 8
            ? "Your password must be 8 characters or longer."
            : "";
        break;
      case "name":
        errors.name =
          value.length < 6 || value.length > 36
            ? "Your name must be in between 6 and 36 characters."
            : "";
        break;
      case "dateofbirth":
        errors.dateofbirth =
          new Date (value) > new Date(today)
            ? "Your date of birth must be valid and before today."
            : "";
        break;
      default:
        break;
    }
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ errors, [name]: value });
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} noValidate>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          {errors.email.length > 0 && (
            <span className="error">{errors.email}</span>
          )}
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="string"
              name="name"
              placeholder="Enter name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          {errors.name.length > 0 && (
            <span className="error">{errors.name}</span>
          )}
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          {errors.password.length > 0 && (
            <span className="error">{errors.password}</span>
          )}
          <Form.Group controlId="dateofbirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateofbirth"
              value={this.state.dateofbirth}
              onChange={this.handleInputChange}
              placeholder="Date of Birth"
            />
          </Form.Group>
          {errors.dateofbirth.length > 0 && (
            <span className="error">{errors.dateofbirth}</span>
          )}
          <br></br>
          {errors.password.length == 0 &&
            errors.email.length == 0 &&
            errors.name.length == 0 &&
            errors.dateofbirth.length == 0 &&
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.name.length > 0 &&
            this.state.dateofbirth.length > 0 && (
              <Button variant="primary" type="submit">
                Submit
              </Button>
            )}
        </Form>
      </div>
    );
  }
}
