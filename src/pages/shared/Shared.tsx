import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PaginationC from "../../components/pagination/PaginationC";
import {
  MdOutlineFolder,
  MdOutlineKeyboardArrowDown,
  MdOutlineStarOutline,
} from "react-icons/md";

function Shared() {
  return (
    <div>
      <div className="flex justify-between py-4 border-b border-b-on-surface dark:border-b-on-surface-dark">
        <span className="text-[1.4em] text-on-surface dark:text-on-surface-dark">
          Shared with me
        </span>
      </div>
      <div className="w-full flex flex-col gap-y-6 py-6">
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="text-on-surface dark:text-on-surface-dark">
                <div className="flex items-center cursor-pointer">
                  <span className="">File Name</span>
                  <MdOutlineKeyboardArrowDown size={18} />
                </div>
              </TableCell>
              <TableCell className="text-on-surface dark:text-on-surface-dark">
                <div className="flex items-center cursor-pointer">
                  <span className="">Creation Date</span>
                  <MdOutlineKeyboardArrowDown size={18} />
                </div>
              </TableCell>
              <TableCell className="text-on-surface dark:text-on-surface-dark">
                <div className="flex items-center cursor-pointer">
                  <span className="">File Size</span>
                  <MdOutlineKeyboardArrowDown size={18} />
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <div className="flex items-center gap-x-3">
                  <MdOutlineFolder
                    size={24}
                    className="text-on-surface dark:text-on-surface-dark"
                  />
                  <span className="text-on-surface dark:text-on-surface-dark">
                    FOLDER NAME
                  </span>
                  <div className="py-1 px-2 rounded-lg text-on-surface-variant dark:text-on-surface-variant-dark border border-outline dark:border-outline-dark">
                    Shared
                  </div>
                  <MdOutlineStarOutline
                    className="text-on-surface-variant"
                    size={20}
                  />
                </div>
              </TableCell>
              <TableCell className="text-on-surface dark:text-on-surface-dark">
                1402/10/11
              </TableCell>
              <TableCell className="text-on-surface dark:text-on-surface-dark">
                500 MB
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

export default Shared;
