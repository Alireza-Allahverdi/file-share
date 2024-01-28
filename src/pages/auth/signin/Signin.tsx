import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonC from "../../../components/button/ButtonC";
import Input from "../../../components/input/Input";
import CryptoJS from "crypto-js";
import { Formik } from "formik";
import { logInReq } from "../../../actions/apiActions";
import { MdLogin, MdOutlineModeEdit } from "react-icons/md";

type loginValueTypes = {
  userName: string;
  password: string;
};

function Signin() {

  const navigate = useNavigate()

  const initialValue: loginValueTypes = {
    userName: "",
    password: "",
  };

  const validate = (values: loginValueTypes) => {
    let errorMsg: {
      userName?: string;
      password?: string;
    } = {};
    if (!values.userName) {
      errorMsg.userName = "add user name";
    }
    if (!values.password) {
      errorMsg.password = "add password";
    }
    return errorMsg;
  };

  const handleLogin = (values: loginValueTypes) => {
    const base64Pass = CryptoJS.enc.Base64.parse(values.password);
    const hashPass = CryptoJS.SHA512(base64Pass).toString(CryptoJS.enc.Hex);    
    logInReq({ username: values.userName, password: hashPass })
    .then((res) => {
      if (res.status === 200) {
              // TODO toast the successful signin
        navigate("/")
      }
    }).catch((err) => {
      // TODO toast when error
      console.log(err.data);
    })
  };

  return (
    <div className="flex flex-col bg-white dark:bg-black gap-4 w-[460px] p-6 rounded-[24px]">
      <p className="text-2xl text-center text-on-surface dark:text-on-surface-dark">
        Welcome
      </p>
      <Formik
        initialValues={initialValue}
        validate={validate}
        onSubmit={handleLogin}
      >
        {({ values, touched, errors, setFieldValue, handleSubmit }) => {
          return (
            <Fragment>
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
                label="Password"
                type="password"
                value={values.password}
                errorText={
                  touched.password && !!errors.password ? errors.password : ""
                }
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
                  className="w-full"
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
  );
}

export default Signin;
