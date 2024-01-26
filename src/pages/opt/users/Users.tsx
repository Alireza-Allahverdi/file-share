import { Fragment, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ButtonC from "../../../components/button/ButtonC";
import { PiPlusBold } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa6";
import ModalC from "../../../components/modal/ModalC";
import SwitchC from "../../../components/switch/SwitchC";
import PaginationC from "../../../components/pagination/PaginationC";
import Input from "../../../components/input/Input";
import { Formik } from "formik";

type registerTypes = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Users() {
  const [newUserModalState, setNewUserModalState] = useState<boolean>(false);


  const initialValue: registerTypes = {
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validate = (values: registerTypes) => {
    let errorMsg: registerTypes = {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
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
    if (!values.confirmPassword) {
      errorMsg.confirmPassword = "add password confirmation";
    }
    if (values.password !== values.confirmPassword) {
      errorMsg.confirmPassword = "password and password confirmation are not the same"
    }
    return errorMsg;
  };

  const handleRegisterUser = (values: registerTypes) => {};


  return (
    <div>
      <ModalC
        title="Register new user"
        open={newUserModalState}
        handleClose={() => setNewUserModalState(false)}
      >
        <div>
          <div className="flex flex-col gap-y-4">
          <Formik
        initialValues={initialValue}
        validate={validate}
        onSubmit={handleRegisterUser}
      >
        {({ values,touched, errors, setFieldValue, handleSubmit }) => {
          return (
            <Fragment>
              <p className="text-[1em]">Enter the info for the new user:</p>
              <Input
                label="First Name"
                type="text"
                value={values.firstName}
                errorText={touched.firstName && !!errors.firstName ? errors.firstName : ""}
                onChange={(e) => setFieldValue("firstName", e.target.value)}
              />
              <Input
                label="last Name"
                type="text"
                value={values.lastName}
                errorText={touched.lastName && !!errors.lastName ? errors.lastName : ""}
                onChange={(e) => setFieldValue("lastName", e.target.value)}
              />
              <Input
                label="User Name"
                type="text"
                value={values.userName}
                errorText={touched.userName && !!errors.userName ? errors.userName : ""}
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
                errorText={touched.password && !!errors.password ? errors.password : ""}
                onChange={(e) => setFieldValue("password", e.target.value)}
              />
              <Input
                label="Confirm Password"
                type="password"
                value={values.confirmPassword}
                errorText={touched.confirmPassword && !!errors.confirmPassword ? errors.confirmPassword : ""}
                onChange={(e) =>
                  setFieldValue("confirmPassword", e.target.value)
                }
              />
              <div className="flex justify-end items-center gap-x-2 mt-2">
                <ButtonC title="Cancel" type="outlined" onCLick={() => setNewUserModalState(false)} />
                <ButtonC title="Add" type="contained" icon={<PiPlusBold />} onCLick={handleSubmit} />
              </div>
            </Fragment>
          );
        }}
      </Formik>
          </div>
        </div>
      </ModalC>
      <div className="flex items-center justify-between py-4 border-b border-b-on-surface dark:border-b-on-surface-dark">
        <span className="text-[1.4em] text-on-surface dark:text-on-surface-dark">
          Users
        </span>
        <ButtonC
          className="w-max"
          title={"Add New User"}
          type="contained"
          icon={<PiPlusBold />}
          onCLick={() => setNewUserModalState(true)}
        />
      </div>
      <div className="w-full flex flex-col gap-y-6 py-6">
        <span className="text-on-surface dark:text-on-surface-dark">
          Total of 50 users are registered in this server
        </span>
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="text-on-surface dark:text-on-surface-dark">
                User Name
              </TableCell>
              <TableCell className="text-on-surface dark:text-on-surface-dark">
                First Name
              </TableCell>
              <TableCell className="text-on-surface dark:text-on-surface-dark">
                Last Name
              </TableCell>
              <TableCell className="text-on-surface dark:text-on-surface-dark">
                Email Address
              </TableCell>
              <TableCell className="text-on-surface dark:text-on-surface-dark">
                Restricted
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <div className="flex items-center gap-x-3">
                  <FaRegUser
                    size={24}
                    className="text-on-surface dark:text-on-surface-dark"
                  />
                  <div className="flex flex-col text-md">
                    <span className="text-on-surface dark:text-on-surface-dark">
                      item
                    </span>
                    <span className="text-on-surface dark:text-on-surface-dark">
                      list item
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-on-surface dark:text-on-surface-dark">
                first name
              </TableCell>
              <TableCell className="text-on-surface dark:text-on-surface-dark">
                last name
              </TableCell>
              <TableCell className="text-on-surface dark:text-on-surface-dark">
                email adddresss
              </TableCell>
              <TableCell className="text-on-surface dark:text-on-surface-dark">
                <SwitchC
                  checked={true}
                  onChange={(checkStatus) => console.log(checkStatus)}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <PaginationC
          itemsCount={100}
          page={0}
          rowsPerPage={10}
          onPageChange={(e, newPage) => console.log(newPage)}
          onRowsPerPageChange={(e) => console.log(parseInt(e.target.value, 10))}
        />
      </div>
    </div>
  );
}

export default Users;
