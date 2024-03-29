import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import CryptoJS from "crypto-js";
import { Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { PiPlusBold } from "react-icons/pi";
import { toast } from "react-toastify";
import {
  addNewUser,
  chnageREstrictaion,
  getUsers,
} from "../../../actions/apiActions";
import ButtonC from "../../../components/button/ButtonC";
import Input from "../../../components/input/Input";
import ModalC from "../../../components/modal/ModalC";
import PaginationC from "../../../components/pagination/PaginationC";
import SwitchC from "../../../components/switch/SwitchC";
import { validateEmail } from "../../../utils/validations";

type registerTypes = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type userDataTypes = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  restricted: boolean;
}[];

function Users() {
  const [userData, setUserData] = useState<userDataTypes>([]);
  const [totalData, setTotalData] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
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
    const errorMsg: {
      userName?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!values.firstName) {
      errorMsg.firstName = "First name cannot be empty";
    }
    if (!values.lastName) {
      errorMsg.lastName = "Last name cannot be empty";
    }

    if (!values.userName || values.userName.length < 6) {
      errorMsg.userName = "Username must be at least 6 characters long";
    }

    if (!values.password || values.password.length < 8) {
      errorMsg.password = "Password must be at least 8 characters long";
    } else if (
      !/\d/.test(values.password) ||
      !/[a-zA-Z]/.test(values.password)
    ) {
      errorMsg.password =
        "Password must contain at last one character and digit";
    }
    if (!values.email || !validateEmail(values.email)) {
      errorMsg.email = "Please enter a valid email address";
    }
    if (!values.confirmPassword || values.confirmPassword !== values.password) {
      errorMsg.confirmPassword = "Repeat password does not match";
    }

    return errorMsg;
  };

  const handleRegisterUser = (values: registerTypes) => {
    const hashPass = CryptoJS.SHA512(values.password)
      .toString(CryptoJS.enc.Hex)
      .toUpperCase();
    addNewUser({
      emailAddress: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: hashPass,
      username: values.userName,
    })
      .then(() => {
        toast.success("User added successfully");
        fetchUsers(1, rowsPerPage);
        setNewUserModalState(false);
      })
      .catch((err) => {
        toast.error(err.response.data);
        setNewUserModalState(false);
      });
  };

  const fetchUsers = (newPage: number, newRowsPerPage: number) => {
    getUsers({
      page: newPage,
      perPage: newRowsPerPage,
    })
      .then((res) => {
        setUserData(res.data.data);
        setTotalData(res.data.itemsCount);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  const handleRestrictionChange = (newStatus: boolean, id: string) => {
    const cloneData = [...userData];
    const objectIndex = userData.findIndex((item) => item.id === id);
    const cloneObject = { ...userData[objectIndex] };
    chnageREstrictaion(id, newStatus).then(() => {
      cloneObject.restricted = newStatus;
      cloneData[objectIndex] = cloneObject;
      setUserData(cloneData);
    });
  };

  useEffect(() => {
    fetchUsers(1, 10);
  }, []);

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
              {({ values, touched, errors, setFieldValue, handleSubmit }) => {
                return (
                  <Fragment>
                    <p className="text-on-surface dark:text-on-surface-dark text-[1em]">
                      Enter the info for the new user:
                    </p>
                    <Input
                      label="First Name"
                      type="text"
                      value={values.firstName}
                      errorText={
                        touched.firstName && !!errors.firstName
                          ? errors.firstName
                          : ""
                      }
                      onChange={(e) =>
                        setFieldValue("firstName", e.target.value)
                      }
                    />
                    <Input
                      label="last Name"
                      type="text"
                      value={values.lastName}
                      errorText={
                        touched.lastName && !!errors.lastName
                          ? errors.lastName
                          : ""
                      }
                      onChange={(e) =>
                        setFieldValue("lastName", e.target.value)
                      }
                    />
                    <Input
                      label="User Name"
                      type="text"
                      value={values.userName}
                      errorText={
                        touched.userName && !!errors.userName
                          ? errors.userName
                          : ""
                      }
                      onChange={(e) =>
                        setFieldValue("userName", e.target.value)
                      }
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      value={values.email}
                      errorText={
                        touched.email && !!errors.email ? errors.email : ""
                      }
                      onChange={(e) => setFieldValue("email", e.target.value)}
                    />
                    <Input
                      label="Password"
                      type="password"
                      value={values.password}
                      errorText={
                        touched.password && !!errors.password
                          ? errors.password
                          : ""
                      }
                      onChange={(e) =>
                        setFieldValue("password", e.target.value)
                      }
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
                    <div className="flex justify-end items-center gap-x-2 mt-2">
                      <ButtonC
                        title="Cancel"
                        type="outlined"
                        onCLick={() => setNewUserModalState(false)}
                      />
                      <ButtonC
                        title="Add"
                        type="contained"
                        icon={<PiPlusBold />}
                        onCLick={handleSubmit}
                      />
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
          Total of {totalData} users are registered in this server
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
            {userData.length !== 0 &&
              userData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    <div className="flex items-center gap-x-3">
                      <FaRegUser
                        size={24}
                        className="text-on-surface dark:text-on-surface-dark"
                      />
                      <div className="flex flex-col text-md">
                        <span className="text-on-surface dark:text-on-surface-dark">
                          {item?.username}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-on-surface dark:text-on-surface-dark">
                    {item?.firstName}
                  </TableCell>
                  <TableCell className="text-on-surface dark:text-on-surface-dark">
                    {item?.lastName}
                  </TableCell>
                  <TableCell className="text-on-surface dark:text-on-surface-dark">
                    {item?.emailAddress}
                  </TableCell>
                  <TableCell className="text-on-surface dark:text-on-surface-dark">
                    <SwitchC
                      checked={item?.restricted}
                      onChange={(checkStatus) =>
                        handleRestrictionChange(checkStatus, item.id)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <PaginationC
          itemsCount={totalData}
          page={page - 1}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => {
            setPage(newPage);
            fetchUsers(newPage, rowsPerPage);
          }}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            fetchUsers(1, parseInt(e.target.value, 10));
          }}
        />
      </div>
    </div>
  );
}

export default Users;
