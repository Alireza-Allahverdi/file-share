import { Formik } from "formik";
import { Fragment } from "react";
import Input from "../../../components/input/Input";
import ButtonC from "../../../components/button/ButtonC";
import { MdLogin, MdOutlineModeEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { getCredentials, sendKey, signUp } from "../../../actions/apiActions";
import CryptoJS from "crypto-js";
import { encrypt } from "../../../utils/functions";

type signUpTypes = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Signup() {
  const navigate = useNavigate();

  const initialValue: signUpTypes = {
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validate = (values: signUpTypes) => {
    let errorMsg: {
      userName?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    // if (!Object.keys(values).every((item) => values[item])) {

    // }
    if (!values.firstName) {
      errorMsg.firstName = "add first name";
    }
    if (!values.lastName) {
      errorMsg.lastName = "add last name";
    }
    if (!values.userName) {
      errorMsg.userName = "add user name";
    }
    if (!values.email) {
      errorMsg.email = "add email address";
    }
    if (!values.password) {
      errorMsg.password = "add password";
    }
    // todo password check pattern
    if (!values.confirmPassword) {
      errorMsg.confirmPassword = "add password confirmation";
    }
    if (values.password !== values.confirmPassword) {
      errorMsg.confirmPassword =
        "password and password confirmation are not the same";
    }
    return errorMsg;
  };

  const handleUserKey = (password: string) => {
    const hash256Pass = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    getCredentials()
      .then((res) => {
        if (!res.data.key) {
          let key = CryptoJS.lib.WordArray.random(32).toString(
            CryptoJS.enc.Hex
          );
          let encrypted = encrypt(key, hash256Pass, res.data.iv);
          sendKey(encrypted)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        // else {
        //   let decrypted = decrypt(res.data.key, hash256Pass, res.data.iv);
        //   console.log(decrypted);
        // }
        // TODO toast the successful signup
        localStorage.setItem("shaPass", hash256Pass);
        navigate("/");
      })
      .catch((err) => {
        // TODO toast the problem with encryption
        console.log(err);
      });
  };

  const handleSignUp = (values: signUpTypes) => {
    const hashPass = CryptoJS.SHA512(values.password).toString(
      CryptoJS.enc.Hex
    );
    signUp({
      username: values.userName,
      firstName: values.firstName,
      lastName: values.lastName,
      emailAddress: values.email,
      password: hashPass,
    })
      .then((res) => {
        if (res.status === 200) {
          handleUserKey(values.password);
        }
      })
      .catch((err) => {
        // TODO toast the unsuccessful signup
        console.log(err);
      });
  };

  return (
    <div className="m-auto flex flex-col gap-4 bg-white dark:bg-black w-[460px] p-6 rounded-[24px]">
      <p className="text-2xl text-center text-on-surface dark:text-on-surface-dark">
        Sign Up
      </p>
      <Formik
        initialValues={initialValue}
        validate={validate}
        onSubmit={handleSignUp}
      >
        {({ values, touched, errors, setFieldValue, handleSubmit }) => {
          return (
            <Fragment>
              <Input
                label="First Name"
                type="text"
                value={values.firstName}
                errorText={
                  touched.firstName && !!errors.firstName
                    ? errors.firstName
                    : ""
                }
                onChange={(e) => setFieldValue("firstName", e.target.value)}
              />
              <Input
                label="last Name"
                type="text"
                value={values.lastName}
                errorText={
                  touched.lastName && !!errors.lastName ? errors.lastName : ""
                }
                onChange={(e) => setFieldValue("lastName", e.target.value)}
              />
              <Input
                label="User Name"
                type="text"
                value={values.userName}
                errorText={
                  touched.userName && !!errors.userName ? errors.userName : ""
                }
                onChange={(e) => setFieldValue("userName", e.target.value)}
              />
              <Input
                label="Email Address"
                type="email"
                value={values.email}
                errorText={touched.email && !!errors.email ? errors.email : ""}
                onChange={(e) => setFieldValue("email", e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                value={values.password}
                errorText={
                  touched.password && !!errors.password ? errors.password : ""
                }
                onChange={(e) => setFieldValue("password", e.target.value)}
              />
              <Input
                label="Confirm Password"
                type="password"
                value={values.confirmPassword}
                errorText={
                  touched.confirmPassword && !!errors.confirmPassword
                    ? errors.confirmPassword
                    : ""
                }
                onChange={(e) =>
                  setFieldValue("confirmPassword", e.target.value)
                }
              />
              <ButtonC
                title="Sign Up"
                type="contained"
                icon={<MdLogin size={20} />}
                onCLick={handleSubmit}
              />
              <Link to="/auth/signin">
                <ButtonC
                  className="w-full"
                  title="Log In "
                  type="outlined"
                  icon={<MdOutlineModeEdit size={20} />}
                  onCLick={() => {}}
                />
              </Link>
            </Fragment>
          );
        }}
      </Formik>
    </div>
  );
}

export default Signup;
