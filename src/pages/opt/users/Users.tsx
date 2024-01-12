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
        <span className="text-[22px] text-on-surface dark:bg-on-surface-dark">
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
        <span>Total of 50 users are registered in this server</span>
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <div className="flex items-center gap-x-3">
                <FaRegUser size={24} />
                <div className="flex flex-col text-md">
                  <span>item</span>
                  <span>list item</span>
                </div>
                </div>
              </TableCell>
              <TableCell>first name</TableCell>
              <TableCell>last name</TableCell>
              <TableCell>email adddresss</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Users;
