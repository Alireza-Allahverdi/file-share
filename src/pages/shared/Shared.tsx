import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  MdOutlineFolder,
  MdOutlineKeyboardArrowDown,
  MdOutlineStarPurple500,
} from "react-icons/md";
import { getShared } from "../../actions/apiActions";
import PaginationC from "../../components/pagination/PaginationC";
import { folderContentTypes } from "../folders/Folders";

function Shared() {
  const BILION = 1_000_000_000;
  const MILION = 1_000_000;
  const THOUSAND = 1_000;

  const [totalData, setTotalData] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [sharedContent, setSharedContent] = useState<folderContentTypes>([]);

  const fetchShared = (newPage: number, newRowsPerPage: number) => {
    getShared({
      page: newPage,
      perPage: newRowsPerPage,
    }).then((res) => {
      setTotalData(res.data.itemsCount);
      setSharedContent(res.data.data);
    });
  };

  useEffect(() => {
    fetchShared(1, 10);
  }, []);

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
                  <span className="">Share Date</span>
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
            {sharedContent.length !== 0 &&
              sharedContent.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    <div className="flex items-center gap-x-3">
                      {item.itemType === "Folder" ? (
                        <MdOutlineFolder size={24} color={item.iconColor} />
                      ) : null}
                      <span className="text-on-surface dark:text-on-surface-dark">
                        {item.name}
                      </span>
                      {item.itemType === "Folder" ? null : item.isShared ? (
                        <div className="py-1 px-2 rounded-lg text-on-surface-variant dark:text-on-surface-variant-dark border border-outline dark:border-outline-dark">
                          Shared
                        </div>
                      ) : null}
                      <MdOutlineStarPurple500
                        className="text-on-surface-variant dark:text-on-surface-variant-dark"
                        size={20}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-on-surface dark:text-on-surface-dark">
                    {item.creationDate.slice(0, 10)}
                  </TableCell>
                  <TableCell className="text-on-surface dark:text-on-surface-dark">
                    {item.itemType === "Folder"
                      ? null
                      : item.size > BILION
                      ? `${(item.size / BILION).toFixed(1)} GB`
                      : item.size > MILION
                      ? `${(item.size / BILION).toFixed(1)} MB`
                      : item.size > THOUSAND
                      ? `${(item.size / BILION).toFixed(1)} KB`
                      : `${item.size.toFixed(1)} B`}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <PaginationC
          itemsCount={totalData}
          page={page - 1}
          rowsPerPage={rowsPerPage}
          onPageChange={(e, newPage) => {
            setPage(newPage);
            fetchShared(newPage, rowsPerPage);
          }}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            fetchShared(1, parseInt(e.target.value, 10));
          }}
        />
      </div>
    </div>
  );
}

export default Shared;
