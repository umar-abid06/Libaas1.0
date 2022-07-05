import React, { Component } from "react";
import {
  auth,
  createUserProfileDocument,
  signUpWithEmailAndPassword,
} from "../../firebase/firebase.utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up.styles.scss";
import { useNavigate } from "react-router-dom";

export default class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password, displayName)
        .then((userCredential) => {
          //   const user = userCredential.user;
          //   console.log(user);
          createUserProfileDocument(userCredential.user, { displayName });

          this.setState({
            displayName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    } catch (error) {
      console.log(error);
    }
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">Don't have an account?</h2>
        <span>Sign up with your email & password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            name="displayName"
            type={"text"}
            label="Name"
            required
            value={displayName}
            handleChange={this.handleChange}
          />
          <FormInput
            name="email"
            type={"email"}
            label="Email"
            required
            value={email}
            handleChange={this.handleChange}
          />
          <FormInput
            name="password"
            type={"password"}
            label="Password"
            required
            value={password}
            handleChange={this.handleChange}
          />
          <FormInput
            name="confirmPassword"
            type={"password"}
            label="Confirm Password"
            required
            value={confirmPassword}
            handleChange={this.handleChange}
          />
          <CustomButton type={"submit"}>SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}
