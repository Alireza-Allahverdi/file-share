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
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoArrowLeft } from "react-icons/go";
import {
  MdArrowLeft,
  MdOutlineAudiotrack,
  MdOndemandVideo,
  MdImage,
  MdInsertDriveFile,
  MdOutlineDeleteOutline,
  MdOutlineDriveFileMove,
  MdOutlineEdit,
  MdOutlineFileDownload,
  MdOutlineFolder,
  MdOutlineFormatPaint,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
  MdOutlineShare,
  MdOutlineStarOutline,
  MdOutlineStarPurple500,
} from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { PiPlus, PiPlusBold } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  createNewFolder,
  customize,
  deleteFiles,
  deleteFolder,
  downloadItem,
  editFileInfo,
  favorite,
  getCredentials,
  getFileInfo,
  getFolderContent,
  getPath,
  getRootFolder,
  moveFile,
  uploadFile,
} from "../../actions/apiActions";
import ButtonC from "../../components/button/ButtonC";
import IconButtonC from "../../components/iconButton/IconButtonC";
import Input from "../../components/input/Input";
import ModalC from "../../components/modal/ModalC";
import PaginationC from "../../components/pagination/PaginationC";
import { toast } from "react-toastify";
import { decrypt, splitFilename } from "../../utils/functions";
import CryptoJS from "crypto-js";

export type folderContentTypes = {
  creationDate: string;
  iconColor: string;
  id: string;
  isFavorite: boolean;
  itemType: string;
  isShared: boolean;
  name: string;
  size: number;
}[];

const Folders = () => {
  const BILION = 1_000_000_000;
  const MILION = 1_000_000;
  const THOUSAND = 1_000;

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

  const textColors = [
    "text-[#F85541]",
    "text-[#FE7340]",
    "text-[#FACF6F]",
    "text-[#4ED499]",
    "text-[#28A56C]",
    "text-[#A1E1E5]",
    "text-[#4B8CDF]",
    "text-[#B79FF7]",
    "text-[#534435]",
    "text-[#5F6368]",
  ];

  const theme = createTheme({
    palette: {
      mode: localStorage.theme,
    },
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  //folder path
  const [folderPath, setFolderPath] = useState<string>("");
  // folder content
  const [totalData, setTotalData] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [folderContent, setFolderContent] = useState<folderContentTypes>([]);
  // selected file content
  const [selectedFileContent, setSelectedFileContent] = useState({});
  const [editInfoModal, setEditInfoModal] = useState<boolean>(false);
  const [newDescryption, setNewDescryption] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [tagText, setTagText] = useState<string>("");
  const [newTags, setNewTags] = useState<string[]>([]);
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
  const [selectedFolderData, setSelectedFolderData] = useState([]);
  const [selectedFileInfo, setSelectedFileInfo] = useState({});
  const [selectedFilePath, setSelectedFilePath] = useState<string>("");
  const [newFolderId, setNewFolderId] = useState<string>("");
  // delete file
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selectedObject, setSelectedObject] = useState<{
    id: string;
    type: string;
  }>();
  const [currentFolde, setCurrentFolder] = useState({});
  // share file
  const [confirmShare, setConfirmShare] = useState<boolean>(false);
  const [shareOptionsModal, setShareOptionsModal] = useState<boolean>(false);
  const [sharedLink, setSharedLink] = useState<string>("");
  const [emaiOruser, setEmailorUser] = useState<string>("");
  const [customLink, setCustomLinks] = useState<boolean>(false);

  const handleClickOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleOptionClose = () => {
    setAnchorEl(null);
  };

  const handleCustomize = (color: string) => {
    customize(selectedObject.id, selectedObject.type === "Folder", color)
      .then((res) => {
        console.log(res.data);
        fetchFolderContent(page, rowsPerPage);
      })
      .catch((err) => {
        console.log(err);
      });
    setAnchorEl(null);
    setCustomizeAnchorEl(null);
  };

  const convertWordArrayToUint8Array = (wordArray: any) => {
    var arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : [];
    var length = wordArray.hasOwnProperty("sigBytes")
      ? wordArray.sigBytes
      : arrayOfWords.length * 4;
    var uInt8Array = new Uint8Array(length),
      index = 0,
      word,
      i;
    for (i = 0; i < length; i++) {
      word = arrayOfWords[i];
      uInt8Array[index++] = word >> 24;
      uInt8Array[index++] = (word >> 16) & 0xff;
      uInt8Array[index++] = (word >> 8) & 0xff;
      uInt8Array[index++] = word & 0xff;
    }
    return uInt8Array;
  };

  const fetchCurrentFolder = () => {
    if (id) {
      getFileInfo(id, true)
        .then((res) => {
          setCurrentFolder(res.data);
          console.log("==============");
          console.log(res.data);
        })
        .catch(() => {
          // todo toast sth wring
        });
    }
  };

  const fetchFolderPath = () => {
    if (id) {
      getPath(id, true)
        .then((res) => {
          setFolderPath(res.data);
        })
        .catch(() => {
          // todo toast sth wring
        });
    }
  };

  const fetchFolderPathByRquest = (folderId: string, firstTime?: boolean) => {
    if (firstTime) {
      getRootFolder()
        .then((res) => {
          getPath(res.data, true)
            .then((response) => {
              setSelectedFilePath(response.data);
              fetchFolderContent(1, 1000, res.data);
              setNewFolderId(res.data);
            })
            .catch(() => {
              // todo toast sth wring
            });
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    } else {
      getPath(folderId, true)
        .then((res) => {
          setSelectedFilePath(res.data);
        })
        .catch(() => {
          // todo toast sth wring
        });
    }
  };

  const fetchFolderContent = (
    newPage: number,
    newRowsPerPage: number,
    folderId?: string
  ) => {
    if (id) {
      if (moveFileModal) {
        getFolderContent({
          id: folderId,
          page: 1,
          rowsPerPage: 1000,
          onlyFolders: true,
        })
          .then((res) => {
            setSelectedFolderData(res.data.data);
          })
          .catch((err) => {
            // todo toast sth wrong
          });
      } else {
        getFolderContent({
          id,
          page: newPage,
          rowsPerPage: newRowsPerPage,
        })
          .then((res) => {
            console.log(res.data);
            setTotalData(res.data.itemsCount);
            setFolderContent(res.data.data);
          })
          .catch((err) => {
            // todo toast sth wrong
          });
      }
    }
  };

  const handleCreatingFolder = () => {
    if (id) {
      createNewFolder({
        name: newFolderName,
        parentId: id,
      })
        .then((res) => {
          console.log(res);
          setNewFolderModal(false);
          fetchFolderContent(1, rowsPerPage);
          // todo success modal
        })
        .catch(() => {
          // todo sth went wrong when creating folder
        });
    }
  };

  const handleDelete = () => {
    if (selectedObject.type === "Folder") {
      deleteFolder(selectedObject.id)
        .then((res) => {
          // todo toast success delete
        })
        .catch((err) => {
          // todo toast fail delete
        });
    } else {
      deleteFiles(selectedObject.id)
        .then((res) => {
          // todo toast success delete
        })
        .catch((err) => [
          // todo toast fail delete
        ]);
    }
    setDeleteModal(false);
  };

  const fetchFileInfo = (id: string, isFolder: boolean) => {
    if (moveFileModal) {
      getFileInfo(id, isFolder).then((res) => {
        setSelectedFileInfo(res.data);
      });
    } else {
      getFileInfo(id, isFolder).then((res) => {
        setSelectedFileContent(res.data);
      });
    }
  };

  const handleEditFileInfo = () => {
    if (searchParams.get("searchId")) {
      editFileInfo({
        id: searchParams.get("searchId"),
        name: newName,
        description: newDescryption,
        tags: newTags,
        isFolder: selectedFileContent?.itemType === "Folder",
      })
        .then((res) => {
          // todo toast success edit
          setEditInfoModal(false);
          navigate(-1);
        })
        .catch(() => {
          // todo toast sth wrong
        });
    }
  };

  const handleMoveFile = () => {
    moveFile(selectedFileInfo.id, newFolderId).then((res) => {
      console.log(res);
      fetchFolderContent(1, rowsPerPage);
      setMoveFileModal(false);
    });
  };

  const decryptFile = (input: any, key: string, fileName: string) => {
    let file = input;
    let reader = new FileReader();
    reader.onload = () => {
      let decrypted = CryptoJS.AES.decrypt(reader.result, key); // Decryption: I: Base64 encoded string (OpenSSL-format) -> O: WordArray
      let typedArray = convertWordArrayToUint8Array(decrypted); // Convert: WordArray -> typed array

      let fileDec = new Blob([typedArray]); // Create blob from typed array
      let a = document.createElement("a");
      let url = window.URL.createObjectURL(fileDec);
      // var filename = file.name.substr(0, file.name.length - 4) + ".dec";
      let filename = fileName;
      a.href = url;
      a.download = filename;
      a.click();
      console.log(url);

      window.URL.revokeObjectURL(url);
    };
    reader.readAsText(file);
  };

  const handelDownload = () => {
    const shaPass = localStorage.getItem("shaPass");
    downloadItem(selectedObject.id).then((res) => {
      console.log(res.data);

      if (res.data.isEncrypted) {
        fetch(res.data.url)
          .then((response2) => response2.blob()) // Gets the response and returns it as a blob
          .then((blob) => {
            console.log(blob);
            getCredentials().then((response) => {
              const descryptKey = decrypt(
                response.data.key,
                shaPass,
                response.data.iv
              );
              decryptFile(blob, descryptKey, res.data.filename);
            });
          });
      } else {
        window.open(res.data.url);
      }
    });
  };

  const handleAddToFavorite = () => {
    favorite(selectedObject.id, selectedObject.type === "Folder").then(
      (res) => {
        setAnchorEl(null);
        fetchFolderContent(page, rowsPerPage);
      }
    );
  };

  const downloadAndDecrypt = () => {
    const shaPass = localStorage.getItem("shaPass");
    downloadItem(selectedObject.id).then((res) => {
      console.log(res.data);
      fetch(res.data.url)
        .then((response2) => response2.blob()) // Gets the response and returns it as a blob
        .then((blob) => {
          console.log(blob);
          getCredentials().then((response) => {
            const descryptKey = decrypt(
              response.data.key,
              shaPass,
              response.data.iv
            );
            let file = blob;
            let reader = new FileReader();
            reader.onload = () => {
              let decrypted = CryptoJS.AES.decrypt(reader.result, descryptKey); // Decryption: I: Base64 encoded string (OpenSSL-format) -> O: WordArray
              let typedArray = convertWordArrayToUint8Array(decrypted); // Convert: WordArray -> typed array

              let fileDec = new Blob([typedArray]); // Create blob from typed array
              let filenameAndExtenstion = splitFilename(res.data.filename);
              console.log(filenameAndExtenstion);
              uploadFile({
                name: filenameAndExtenstion[0],
                Extension: filenameAndExtenstion[1],
                file: fileDec,
                isEncypted: false,
                parentId: id,
              }).then((uploadRes) => {
                handleDelete();
                setConfirmShare(false);
                setShareOptionsModal(true);
                downloadItem(selectedObject.id).then((downloadRes) => {
                  setSharedLink(res.data.url);
                });
              });
              let url = window.URL.createObjectURL(fileDec);
              // var filename = file.name.substr(0, file.name.length - 4) + ".dec";
              window.URL.revokeObjectURL(url);
            };
            reader.readAsText(file);
          });
        });
    });
  };

  // const

  useEffect(() => {
    fetchFolderPath();
    fetchFolderContent(1, 10);
    fetchCurrentFolder();
  }, [id]);

  useEffect(() => {
    if (moveFileModal) {
      fetchFolderPathByRquest(id, true);
      fetchFileInfo(selectedObject.id, false);
    }
  }, [selectedObject, moveFileModal]);

  return (
    <div className="flex justify-between h-full">
      <div
        className={`h-full ${
          !!searchParams.get("searchId") ? "w-[70%]" : "w-full"
        } bg-on-primary dark:bg-on-primary-dark rounded-2xl py-6 px-14 shadow-[#0000004D] shadow-sm`}
      >
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
              <ButtonC
                title="Save"
                type="contained"
                onCLick={handleCreatingFolder}
              />
            </div>
          </div>
        </ModalC>
        <ModalC
          title="Are you sure?"
          open={confirmShare}
          handleClose={() => setConfirmShare(false)}
        >
          <div className="flex flex-col gap-y-6">
            <span className="text-[1em] text-on-surface dark:text-on-surface-dark">
              By sharing, you will remove the encryption from this file and the
              content of it will be visible publicly.
            </span>
            <div className="flex justify-end gap-x-2">
              <ButtonC
                title="Cancel"
                type="outlined"
                onCLick={() => setConfirmShare(false)}
              />
              <ButtonC
                title="Share"
                type="contained"
                onCLick={downloadAndDecrypt}
              />
            </div>
          </div>
        </ModalC>
        <ModalC
          title="Share"
          open={shareOptionsModal}
          handleClose={() => setShareOptionsModal(false)}
        >
          <div className="flex flex-col gap-y-6">
            <span className="text-[0.9em] text-on-surface dark:text-on-surface-dark">
              Sharing link has been generated. You can share this file using the
              following link:
            </span>
            <span className="text-[0.9em] text-on-surface dark:text-on-surface-dark underline">
              {sharedLink.slice(0, 40)}...
            </span>
            <span className="text-[0.9em] text-on-surface dark:text-on-surface-dark">
              OR you can share this file with others directly using their email
              or username:
            </span>
            <div>
              <Input
                value={emaiOruser}
                type="text"
                label="Email Or User Name"
                onChange={(e) => setEmailorUser(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-x-2">
              <ButtonC
                title="Cancel"
                type="outlined"
                onCLick={() => setShareOptionsModal(false)}
              />
              <ButtonC
                title="Share"
                type="contained"
                onCLick={() => {
                  setCustomLinkModal(true);
                }}
              />
            </div>
          </div>
        </ModalC>
        <div className="flex justify-between py-4 border-b border-b-on-surface dark:border-b-on-surface-dark">
          <div className="flex flex-col">
            <span className="text-[1.4em] text-on-surface dark:text-on-surface-dark flex items-center">
              {!currentFolde.parentId ? (
                <>Home</>
              ) : (
                <>
                  <MdArrowLeft
                    size={24}
                    onClick={() =>
                      navigate("/folders/" + currentFolde.parentId)
                    }
                  />
                  {currentFolde.name}
                </>
              )}
            </span>
            <span className="text-[0.8em] text-on-surface-variant dark:text-on-surface-variant-dark">
              {folderPath}
            </span>
          </div>
          <ButtonC
            title="New Folder"
            type="outlined"
            icon={<PiPlusBold size={18} />}
            onCLick={() => setNewFolderModal(true)}
          />
        </div>
        <div className={`w-full flex flex-col gap-y-6 py-6`}>
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
              {folderContent.length !== 0 &&
                folderContent.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell
                      component="th"
                      scope="row"
                      className="cursor-pointer"
                      onClick={() => {
                        navigate(`/folders/${id}?searchId=${item.id}`, {
                          replace: true,
                        });
                        fetchFileInfo(
                          item.id,
                          item.itemType === "Folder" ? true : false
                        );
                      }}
                      onDoubleClick={() =>
                        item.itemType === "Folder"
                          ? navigate(`/folders/${item.id}`)
                          : () => {}
                      }
                    >
                      <div className="flex items-center gap-x-3">
                        {item.itemType === "Folder" ? (
                          <MdOutlineFolder
                            size={24}
                            className={item.iconColor.replace("bg", "text")}
                          />
                        ) : item.itemType === "Audio" ? (
                          <MdOutlineAudiotrack
                            size={24}
                            className={item.iconColor.replace("bg", "text")}
                          />
                        ) : item.itemType === "Video" ? (
                          <MdOndemandVideo
                            size={24}
                            className={item.iconColor.replace("bg", "text")}
                          />
                        ) : item.itemType === "Image" ? (
                          <MdImage
                            size={24}
                            className={item.iconColor.replace("bg", "text")}
                          />
                        ) : item.itemType === "Document" ? (
                          <TiDocumentText
                            size={24}
                            className={item.iconColor.replace("bg", "text")}
                          />
                        ) : (
                          <MdInsertDriveFile
                            size={24}
                            className={item.iconColor.replace("bg", "text")}
                          />
                        )}
                        <span className="text-on-surface dark:text-on-surface-dark">
                          {item.name}
                        </span>
                        {item.itemType === "Folder" ? null : item.isShared ? (
                          <div className="py-1 px-2 rounded-lg text-on-surface-variant dark:text-on-surface-variant-dark border border-outline dark:border-outline-dark">
                            Shared
                          </div>
                        ) : null}
                        {item.isFavorite ? (
                          <MdOutlineStarPurple500
                            className="text-on-surface-variant dark:text-on-surface-variant-dark"
                            size={20}
                          />
                        ) : (
                          <MdOutlineStarOutline
                            className="text-on-surface-variant dark:text-on-surface-variant-dark"
                            size={20}
                          />
                        )}
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
                        ? `${(item.size / MILION).toFixed(1)} MB`
                        : item.size > THOUSAND
                        ? `${(item.size / THOUSAND).toFixed(1)} KB`
                        : `${item.size.toFixed(1)} B`}
                    </TableCell>
                    <TableCell className="text-on-surface dark:text-on-surface-dark">
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        onClick={(e) => {
                          setSelectedObject({
                            id: item.id,
                            type: item.itemType,
                          });
                          handleClickOption(e);
                        }}
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
                            onClick={(e) =>
                              setCustomizeAnchorEl(e.currentTarget)
                            }
                          >
                            <div className="flex items-center gap-x-3">
                              <MdOutlineFormatPaint size={20} />
                              <span>Customize</span>
                              <span>
                                <MdOutlineKeyboardArrowRight />
                              </span>
                            </div>
                          </MenuItem>
                          <MenuItem onClick={handelDownload}>
                            <div className="flex items-center gap-x-3">
                              <MdOutlineFileDownload size={20} />
                              <span>Download</span>
                            </div>
                          </MenuItem>
                          <MenuItem onClick={handleAddToFavorite}>
                            <div className="flex items-center gap-x-3">
                              {item.isFavorite ? (
                                <MdOutlineStarPurple500 size={20} />
                              ) : (
                                <MdOutlineStarOutline size={20} />
                              )}
                              <span>Add to favorite</span>
                            </div>
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              if (!item.isShared) {
                                setConfirmShare(true);
                              } else {
                              }
                            }}
                          >
                            <div className="flex items-center gap-x-3">
                              <MdOutlineShare size={20} />
                              <span>Share</span>
                            </div>
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setAnchorEl(null);
                              setDeleteModal(true);
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
                                    onClick={() => handleCustomize(color)}
                                  ></div>
                                ))}
                            </div>
                            <div className="flex gap-2">
                              {colors
                                .slice(5)
                                .map((color: string, index: number) => (
                                  <div
                                    key={index}
                                    className={`w-8 h-8 ${color} rounded-full cursor-pointer`}
                                    onClick={() => handleCustomize(color)}
                                  ></div>
                                ))}
                            </div>
                          </div>
                        </Menu>
                      </ThemeProvider>
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
              fetchFolderContent(newPage, rowsPerPage);
            }}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              fetchFolderContent(1, parseInt(e.target.value, 10));
            }}
          />
        </div>
        <ModalC
          title={`Move “${selectedFileInfo?.name}”`}
          open={moveFileModal}
          handleClose={() => setMoveFileModal(false)}
        >
          <div className="flex flex-col gap-y-4">
            <span className="text-[0.875em] text-on-surface-variant dark:text-on-surface-variant-dark">
              Current location: {folderPath}
            </span>
            <span className="text-[0.875em] text-on-surface-variant dark:text-on-surface-variant-dark">
              New location: {selectedFilePath}
            </span>
            <div className="flex flex-col">
              {/* if we were inside a folder */}
              {selectedFilePath === "/" ? null : (
                <div className="flex items-center gap-x-4 bg-surface-dim dark:bg-surface-dim-dark p-4">
                  <IconButtonC
                    icon={
                      <GoArrowLeft
                        className="text-on-surface dark:text-on-surface-dark"
                        size={20}
                      />
                    }
                    onClick={() => {
                      fetchFolderContent(1, 1000, id);
                      fetchFolderPathByRquest(id);
                    }}
                  />
                  <MdOutlineFolder
                    size={20}
                    className="text-on-surface dark:text-on-surface-dark"
                  />
                  <span className="text-[1em] text-on-surface dark:text-on-surface-dark">
                    example folder
                  </span>
                </div>
              )}
              {selectedFolderData?.map((item) => (
                <div
                  className="flex items-center gap-x-4 p-4 border-b border-b-outline-variant dark:border-b-outline-variant-dark cursor-pointer"
                  onClick={() => {
                    fetchFolderContent(1, 1000, item.id);
                    fetchFolderPathByRquest(item.id);
                  }}
                >
                  <MdOutlineFolder
                    size={20}
                    className="text-on-surface dark:text-on-surface-dark"
                  />
                  <span className="text-[1em] text-on-surface dark:text-on-surface-dark">
                    {item.name}
                  </span>
                  <MdOutlineKeyboardArrowRight
                    size={20}
                    className="text-on-surface dark:text-on-surface-dark ml-auto"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-x-2">
              <ButtonC
                title="Cancel"
                type="outlined"
                onCLick={() => setMoveFileModal(false)}
              />
              <ButtonC title="Move" type="contained" onCLick={handleMoveFile} />
            </div>
          </div>
        </ModalC>
        <ModalC
          title="Are you sure?"
          open={deleteModal}
          handleClose={() => setDeleteModal(false)}
        >
          <div className="flex flex-col gap-y-6">
            <div className="flex justify-end gap-x-2">
              <ButtonC
                title="Cancel"
                type="outlined"
                onCLick={() => setDeleteModal(false)}
              />
              <ButtonC title="Delete" type="contained" onCLick={handleDelete} />
            </div>
          </div>
        </ModalC>
      </div>
      {!!searchParams.get("searchId") ? (
        <div className="w-[28%] bg-on-primary dark:bg-on-primary-dark rounded-2xl py-6 px-14 shadow-[#0000004D] shadow-sm">
          <div className="flex justify-between py-4 border-b border-b-on-surface dark:border-b-on-surface-dark">
            <span className="text-[1.4em] text-on-surface dark:text-on-surface-dark">
              {selectedFileContent?.name}
            </span>
            <IconButtonC
              icon={<MdOutlineEdit size={24} />}
              onClick={() => setEditInfoModal(true)}
            />
          </div>
          <div className="flex flex-col gap-y-3 py-6 border-b border-b-on-surface dark:border-b-on-surface-dark">
            <div className="flex justify-between">
              <span className="w-1/3 text-on-surface dark:text-on-surface-dark text-[1.2em] font-semibold">
                Info
              </span>
            </div>
            <div className="flex justify-between">
              <span className="w-2/5 text-on-surface dark:text-on-surface-dark text-[1em]">
                Description
              </span>
              <span className="w-1/2 text-on-surface dark:text-on-surface-dark text-[1em]">
                {selectedFileContent?.description}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="w-2/5 text-on-surface dark:text-on-surface-dark text-[1em]">
                Tags
              </span>
              <div className="w-1/2 flex flex-wrap gap-x-1">
                {selectedFileContent?.tags?.map((item) => (
                  <div className="py-1 px-2 rounded-lg text-on-surface-variant dark:text-on-surface-variant-dark border border-outline dark:border-outline-dark">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <span className="w-2/5 text-on-surface dark:text-on-surface-dark text-[1em]">
                File Size
              </span>
              {selectedFileContent?.itemType === "Folder" ? null : (
                <span className="w-1/2 text-on-surface dark:text-on-surface-dark text-[1em]">
                  {selectedFileContent?.itemType === "Folder"
                    ? null
                    : selectedFileContent?.size > BILION
                    ? `${(selectedFileContent?.size / BILION)?.toFixed(1)} GB`
                    : selectedFileContent?.size > MILION
                    ? `${(selectedFileContent?.size / MILION)?.toFixed(1)} MB`
                    : selectedFileContent?.size > THOUSAND
                    ? `${(selectedFileContent?.size / THOUSAND)?.toFixed(1)} KB`
                    : `${selectedFileContent?.size?.toFixed(1)} B`}
                </span>
              )}
            </div>
            <div className="flex justify-between">
              <span className="w-2/5 text-on-surface dark:text-on-surface-dark text-[1em]">
                Sharing Status
              </span>
              <span className="w-1/2 text-on-surface dark:text-on-surface-dark text-[1em]">
                {selectedFileContent?.isShared ? "Public" : "Private"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-y-3 py-6">
            <span className="w-1/3 text-on-surface dark:text-on-surface-dark text-[1.2em] font-semibold">
              Activity
            </span>
            <div className="flex flex-col gap-y-2">
              {selectedFileContent?.activities?.map((item) => (
                <div className="flex flex-col gap-y-1">
                  <span className="text-on-surface dark:text-on-surface-dark text-[0.8em]">
                    {item?.operation}
                  </span>
                  <span className="text-on-surface-variant dark:text-on-surface-variant-dark text-[0.7em]">
                    {item?.date?.slice(0, 10)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <ModalC
        open={editInfoModal}
        title="Edit"
        handleClose={() => setEditInfoModal(false)}
      >
        <div className="flex flex-col gap-y-6">
          <Input
            label="File Name"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <textarea
            placeholder="Descryption"
            className="w-full border border-[#bdbdbd] p-3 text-on-surface dark:text-on-surface-dark rounded-md bg-transparent resize-none"
            value={newDescryption}
            rows={10}
            onChange={(e) => setNewDescryption(e.target.value)}
          ></textarea>
          <div className="flex items-center justify-between">
            <Input
              className="w-3/4"
              label="New Tag"
              type="text"
              value={tagText}
              onChange={(e) => {
                setTagText(e.target.value);
              }}
            />
            <IconButtonC
              icon={<PiPlus />}
              onClick={() => {
                setNewTags([...newTags, tagText]);
                setTagText("");
              }}
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {newTags.map((tag, index: number) => (
              <div className="flex items-center justify-between py-1 px-2 rounded-lg text-on-surface-variant dark:text-on-surface-variant-dark border border-outline dark:border-outline-dark">
                {tag}
                <RxCross2
                  className="ml-1 cursor-pointer"
                  onClick={() => {
                    let newArray = [...newTags];
                    newArray.splice(index, 1);
                    setNewTags(newArray);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-x-2">
            <ButtonC
              title="Cancel"
              type="outlined"
              onCLick={() => setEditInfoModal(false)}
            />
            <ButtonC
              title="Save"
              type="contained"
              onCLick={handleEditFileInfo}
            />
          </div>
        </div>
      </ModalC>
    </div>
  );
};

export default Folders;
