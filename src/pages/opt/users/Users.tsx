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

function Users() {
  return (
    <div>
      <div className="flex items-center justify-between py-4 border-b border-b-on-surface dark:border-b-on-surface-dark">
        <span className="text-[22px] text-on-surface dark:text-on-surface-dark">
          Users
        </span>
        <ButtonC
          className="w-max"
          title={"Add New User"}
          type="contained"
          icon={<PiPlusBold />}
          onCLick={() => {}}
        />
      </div>
      <div className="w-full flex flex-col gap-y-6 py-6">
        <span className="text-on-surface dark:text-on-surface-dark">Total of 50 users are registered in this server</span>
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="text-on-surface dark:text-on-surface-dark">User Name</TableCell>
              <TableCell className="text-on-surface dark:text-on-surface-dark">First Name</TableCell>
              <TableCell className="text-on-surface dark:text-on-surface-dark">Last Name</TableCell>
              <TableCell className="text-on-surface dark:text-on-surface-dark">Email Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <div className="flex items-center gap-x-3">
                <FaRegUser size={24} className="text-on-surface dark:text-on-surface-dark" />
                <div className="flex flex-col text-md">
                  <span className="text-on-surface dark:text-on-surface-dark">item</span>
                  <span className="text-on-surface dark:text-on-surface-dark">list item</span>
                </div>
                </div>
              </TableCell>
              <TableCell className="text-on-surface dark:text-on-surface-dark">first name</TableCell>
              <TableCell className="text-on-surface dark:text-on-surface-dark">last name</TableCell>
              <TableCell className="text-on-surface dark:text-on-surface-dark">email adddresss</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Users;
