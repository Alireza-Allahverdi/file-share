import { Formik } from "formik";
import { Fragment } from "react";
import Input from "../../components/input/Input";
import ButtonC from "../../components/button/Button";
import { MdLogin, MdOutlineModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";

function Signup() {
  type signUpTypes = {
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
  };

  const initialValue: signUpTypes = {
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  };

  const validate = (values: signUpTypes) => {
    let errorMsg: signUpTypes = {
      userName: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    };
    if (!Object.keys(values).every((item) => values[item])) {
      
    }
    return errorMsg;
  };

  const handleSignUp = (values: signUpTypes) => {};

  return (
    <div className="w-full pt-[140px]">
      <div className="m-auto flex flex-col gap-4 border border-orange-500 w-[420px] p-6 rounded-xl">
        <p className="text-2xl text-center">Sign Up</p>
        <Formik
          initialValues={initialValue}
          validate={validate}
          onSubmit={handleSignUp}
        >
          {({ values, errors, setFieldValue, handleSubmit }) => {
            return (
              <Fragment>
                <Input
                  label="User Name"
                  type="text"
                  value={values.userName}
                  errorText={!!errors.userName ? errors.userName : ""}
                  onChange={(e) => setFieldValue("userName", e.target.value)}
                />
                <Input
                  label="First Name"
                  type="text"
                  value={values.firstName}
                  errorText={!!errors.firstName ? errors.firstName : ""}
                  onChange={(e) => setFieldValue("firstName", e.target.value)}
                />
                <Input
                  label="last Name"
                  type="text"
                  value={values.lastName}
                  errorText={!!errors.lastName ? errors.lastName : ""}
                  onChange={(e) => setFieldValue("lastName", e.target.value)}
                />
                <Input
                  label="Password"
                  type="password"
                  value={values.password}
                  errorText={!!errors.password ? errors.password : ""}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  value={values.confirmPassword}
                  errorText={
                    !!errors.confirmPassword ? errors.confirmPassword : ""
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
    </div>
  );
}

export default Signup;
