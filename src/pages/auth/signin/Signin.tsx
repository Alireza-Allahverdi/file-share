import CryptoJS from "crypto-js";
import { Formik } from "formik";
import { Fragment } from "react";
import { MdLogin, MdOutlineModeEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCredentials, logInReq, sendKey } from "../../../actions/apiActions";
import ButtonC from "../../../components/button/ButtonC";
import Input from "../../../components/input/Input";
import { encrypt } from "../../../utils/functions";

type loginValueTypes = {
  userName: string;
  password: string;
};

function Signin() {
  const navigate = useNavigate();

  const initialValue: loginValueTypes = {
    userName: "",
    password: "",
  };

  const validate = (values: loginValueTypes) => {
    const errorMsg: {
      userName?: string;
      password?: string;
    } = {};
    if (!values.userName) {
      errorMsg.userName = "Username cannot be empty";
    }
    if (!values.password) {
      errorMsg.password = "Password cannot be empty";
    }
    return errorMsg;
  };

  const handleUserKey = (password: string) => {
    const hash256Pass = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    getCredentials()
      .then((res) => {
        if (!res.data.key) {
          const key = CryptoJS.lib.WordArray.random(64).toString(
            CryptoJS.enc.Hex
          );
          const encrypted = encrypt(key, hash256Pass, res.data.iv);
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
        toast.success("Login successful");
        localStorage.setItem("shaPass", hash256Pass);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  const handleLogin = (values: loginValueTypes) => {
    const hashPass = CryptoJS.SHA512(values.password)
      .toString(CryptoJS.enc.Hex)
      .toUpperCase();
    logInReq({ username: values.userName, password: hashPass })
      .then((res) => {
        if (res.status === 200) {
          handleUserKey(values.password);
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
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
