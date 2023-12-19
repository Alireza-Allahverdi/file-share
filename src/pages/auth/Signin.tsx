import { Link } from "react-router-dom";
import ButtonC from "../../components/button/Button";
import Input from "../../components/input/Input";
import { MdLogin, MdOutlineModeEdit } from "react-icons/md";
import { Formik } from "formik";
import { Fragment } from "react";

type loginValueTypes = {
  userName: string;
  password: string;
};

function Signin() {
  const initialValue: loginValueTypes = {
    userName: "",
    password: "",
  };

  const validate = (values: loginValueTypes) => {
    let errorMsg: loginValueTypes = {
      userName: "",
      password: "",
    };
    if (!values.userName) {
      errorMsg.userName = "add user name";
    }
    if (!values.password) {
      errorMsg.password = "add password";
    }
    return errorMsg;
  };

  const handleLogin = (values: loginValueTypes) => {};

  return (
    <div className="w-full pt-[140px]">
      <div className="m-auto flex flex-col gap-4 border border-orange-500 w-[420px] p-6 rounded-xl">
        <p className="text-2xl text-center">Welcome</p>
        <Formik
          initialValues={initialValue}
          validate={validate}
          onSubmit={handleLogin}
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
                  label="Password"
                  type="password"
                  value={values.password}
                  errorText={!!errors.password ? errors.password : ""}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                />
                <ButtonC
                  title="Log In"
                  type="contained"
                  icon={<MdLogin size={20} />}
                  onCLick={handleSubmit}
                />
                <Link to="/auth/signup">
                  <ButtonC
                    title="Sign Up"
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

export default Signin;
