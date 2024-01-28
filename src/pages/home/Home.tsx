import { useState } from "react";
import ButtonC from "../../components/button/ButtonC";
import ModalC from "../../components/modal/ModalC";
import Input from "../../components/input/Input";
import {
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import PaginationC from "../../components/pagination/PaginationC";
import { PiPlusBold } from "react-icons/pi";
import {
  MdOutlineDeleteOutline,
  MdOutlineDriveFileMove,
  MdOutlineFileDownload,
  MdOutlineFolder,
  MdOutlineFormatPaint,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
  MdOutlineShare,
  MdOutlineStarOutline,
} from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import IconButtonC from "../../components/iconButton/IconButtonC";

const Home = () => {
  const colors = [
    "bg-[#F85541]",
    "bg-[#FE7340]",
    "bg-[#FACF6F]",
    "bg-[#4ED499]",
    "bg-[#28A56C]",
    "bg-[#A1E1E5]",
    "bg-[#4B8CDF]",
    "bg-[#B79FF7]",
    "bg-[#534435]",
    "bg-[#5F6368]",
  ];

  const theme = createTheme({
    palette: {
      mode: localStorage.theme,
    },
  });

  // new folder
  const [newFolderName, setNewFolderName] = useState<string>("");
  const [newFolderModal, setNewFolderModal] = useState<boolean>(false);
  // table option
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const tableOptionState = Boolean(anchorEl);
  const [customizeAnchorEl, setCustomizeAnchorEl] =
    useState<null | HTMLElement>(null);
  const customizeState = Boolean(customizeAnchorEl);
  // move file
  const [moveFileModal, setMoveFileModal] = useState<boolean>(false);
  // delete file
  const [deleteModal, setDeleteModal] = useState<boolean>(false)

  const handleClickOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleOptionClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ModalC
        open={newFolderModal}
        title="New Folder"
        handleClose={() => setNewFolderModal(false)}
      >
        <div className="flex flex-col gap-y-6">
          <Input
            label="Folder Name"
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <div className="flex justify-end gap-x-2">
            <ButtonC
              title="Cancel"
              type="outlined"
              onCLick={() => setNewFolderModal(false)}
            />
            <ButtonC title="Save" type="contained" />
          </div>
        </div>
      </ModalC>
      <div className="flex justify-between py-4 border-b border-b-on-surface dark:border-b-on-surface-dark">
        <span className="text-[1.4em] text-on-surface dark:text-on-surface-dark">
          Home
        </span>
        <ButtonC
          title="New Folder"
          type="outlined"
          icon={<PiPlusBold size={18} />}
          onCLick={() => setNewFolderModal(true)}
        />
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
              <TableCell className="text-on-surface dark:text-on-surface-dark"></TableCell>
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
              <TableCell className="text-on-surface dark:text-on-surface-dark">
                <IconButton
                  aria-label="more"
                  id="long-button"
                  onClick={handleClickOption}
                  className="text-on-surface dark:text-on-surface-dark"
                >
                  <BsThreeDotsVertical />
                </IconButton>
                <ThemeProvider theme={theme}>
                  <Menu
                    anchorEl={anchorEl}
                    open={tableOptionState}
                    onClose={handleOptionClose}
                  >
                    <MenuItem
                      onClick={() => {
                        // there will be a value saving aswell
                        setAnchorEl(null);
                        setMoveFileModal(true);
                      }}
                    >
                      <div className="flex items-center gap-x-3">
                        <MdOutlineDriveFileMove size={20} />
                        <span>Move Item</span>
                      </div>
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => setCustomizeAnchorEl(e.currentTarget)}
                    >
                      <div className="flex items-center gap-x-3">
                        <MdOutlineFormatPaint size={20} />
                        <span>Customize</span>
                        <span>
                          <MdOutlineKeyboardArrowRight />
                        </span>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div className="flex items-center gap-x-3">
                        <MdOutlineFileDownload size={20} />
                        <span>Download</span>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div className="flex items-center gap-x-3">
                        <MdOutlineShare size={20} />
                        <span>Share</span>
                      </div>
                    </MenuItem>
                    <MenuItem 
                    onClick={() => {
                      setAnchorEl(null)
                      setDeleteModal(true)
                    }}
                    >
                      <div className="flex items-center gap-x-3">
                        <MdOutlineDeleteOutline size={20} />
                        <span>Delete</span>
                      </div>
                    </MenuItem>
                  </Menu>
                  <Menu
                    anchorEl={customizeAnchorEl}
                    open={customizeState}
                    onClose={() => {
                      setAnchorEl(null);
                      setCustomizeAnchorEl(null);
                    }}
                  >
                    <div className="flex flex-col gap-2 p-2">
                      <div className="flex gap-2">
                        {colors
                          .slice(0, 5)
                          .map((color: string, index: number) => (
                            <div
                              key={index}
                              className={`w-8 h-8 ${color} rounded-full cursor-pointer`}
                            ></div>
                          ))}
                      </div>
                      <div className="flex gap-2">
                        {colors.slice(5).map((color: string, index: number) => (
                          <div
                            key={index}
                            className={`w-8 h-8 ${color} rounded-full cursor-pointer`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </Menu>
                </ThemeProvider>
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
      <ModalC
        title="Move “FILE NAME”"
        open={moveFileModal}
        handleClose={() => setMoveFileModal(false)}
      >
        <div className="flex flex-col gap-y-4">
          <span className="text-[0.875em] text-on-surface-variant dark:bg-on-surface-variant-dark">
            Current location: /folder1/folder2/
          </span>
          <span className="text-[0.875em] text-on-surface-variant dark:bg-on-surface-variant-dark">
            New location: /
          </span>
          <div className="flex flex-col">
            {/* if we were inside a folder */}
            <div className="flex items-center gap-x-4 bg-surface-dim dark:bg-surface-dim-dark p-4">
              <IconButtonC
                icon={
                  <GoArrowLeft
                    className="text-on-surface dark:text-on-surface-dark"
                    size={20}
                  />
                }
                onClick={() => {}}
              />
              <MdOutlineFolder
                size={20}
                className="text-on-surface dark:text-on-surface-dark"
              />
              <span className="text-[1em] text-on-surface dark:text-on-surface-dark">
                example folder
              </span>
            </div>
            <div className="flex items-center gap-x-4 p-4 border-b border-b-outline-variant dark:border-b-outline-variant-dark cursor-pointer">
              <MdOutlineFolder
                size={20}
                className="text-on-surface dark:text-on-surface-dark"
              />
              <span className="text-[1em] text-on-surface dark:text-on-surface-dark">
                example folder
              </span>
              <MdOutlineKeyboardArrowRight
                size={20}
                className="text-on-surface dark:text-on-surface-dark ml-auto"
              />
            </div>
          </div>
                      <div className="flex justify-end gap-x-2">
            <ButtonC
              title="Cancel"
              type="outlined"
              onCLick={() => setMoveFileModal(false)}
            />
            <ButtonC title="Move" type="contained" />
          </div>
        </div>
      </ModalC>
      <ModalC
        title="Are you sure?"
        open={deleteModal}
        handleClose={() => setDeleteModal(false)}
      >
        <div className="flex flex-col gap-y-6">
          <span className="text-on-surface dark:text-on-surface-dark">
          Are you sure
          </span>
          <div className="flex justify-end gap-x-2">
            <ButtonC 
            title="Cancel"
            type="outlined"
            onCLick={() => setDeleteModal(false)}
            />
            <ButtonC 
            title="Delete"
            type="contained"
            onCLick={() => {
              // delete file
            }}
            />
          </div>
        </div>
      </ModalC>

    </div>
  );
};

export default Home;
