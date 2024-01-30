import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import IconButtonC from "../iconButton/IconButtonC";
import MenuItemC from "../menuItem/MenuItemC";
import ButtonC from "../button/ButtonC";
import {
  MdOutlineFileUpload,
  MdOutlineHome,
  MdOutlineInfo,
  MdOutlinePeopleAlt,
  MdOutlineSettings,
  MdOutlineStarOutline,
} from "react-icons/md";
import { WebsiteIcon } from "../../assets";
import { useEffect, useState } from "react";
import ModalC from "../modal/ModalC";
import Dropzone from "react-dropzone";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { FaGithub } from "react-icons/fa6";
import {
  fetchAccount,
  getCredentials,
  getUserStorageUsage,
  logOut,
  uploadFile,
} from "../../actions/apiActions";
import CryptoJS from "crypto-js";
import { decrypt, splitFilename } from "../../utils/functions";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const options = [
    {
      label: "Home",
      icon: <MdOutlineHome size={24} />,
      link: "",
    },
    {
      label: "Shared with me",
      icon: <MdOutlinePeopleAlt size={24} />,
      link: "shared",
    },
    {
      label: "Favorites",
      icon: <MdOutlineStarOutline size={24} />,
      link: "favorite",
    },
  ];

  const theme = createTheme({
    palette: {
      mode: localStorage.theme,
    },
  });

  const { id } = useParams();

  const [aboutModalState, setAboutModalState] = useState<boolean>(false);
  const [uploadModalState, setUploadModalState] = useState<boolean>(false);
  const [storage, setStorage] = useState<{ total: number; usage: number }>({
    total: 0,
    usage: 0,
  });

  const handleUploadFile = (input: React.ChangeEvent<HTMLInputElement>) => {
    let file = input[0];
    let reader = new FileReader();
    reader.onload = () => {
      getCredentials().then((res) => {
        let shaPass = localStorage.getItem("shaPass");
        let decryptedKey = decrypt(res.data.key, shaPass, res.data.iv);
        let wordArray = CryptoJS.lib.WordArray.create(reader.result); // Convert: ArrayBuffer -> WordArray
        let encrypted = CryptoJS.AES.encrypt(
          wordArray,
          decryptedKey
        ).toString(); // Encryption: I: WordArray -> O: -> Base64 encoded string (OpenSSL-format)

        let fileEnc = new Blob([encrypted]); // Create blob from string
        // let a = document.createElement("a");
        console.log(fileEnc);
        
        let url = window.URL.createObjectURL(fileEnc);
        // let filename = file.name + ".enc";
        // a.href = url;
        // a.download = filename;
        // a.click();
        // console.log(url);

        window.URL.revokeObjectURL(url);
        uploadFile({
          name: splitFilename(file.name)[0],
          file: fileEnc,
          Extension: splitFilename(file.name)[1],
          isEncypted: true,
          parentId: id,
        }).then((uploadRes) => {
          console.log(uploadRes);
          setUploadModalState(false)
          window.location.reload()
        });
      });
    };
    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    fetchAccount()
      .then(() => {
        getUserStorageUsage().then((res) => {
          setStorage({
            usage: parseInt((res.data.totalUsage / 1_000_000_000).toFixed(1)),
            total: parseInt((res.data.totalSpace / 1_000_000_000).toFixed(1)),
          });
        });
      })
      .catch((err) => {
        logOut().then(() => {
          navigate("/auth/signin");
        });
      });
  }, []);

  return (
    <div className="flex flex-col w-full h-screen px-2 bg-surface-container dark:bg-surface-container-dark">
      <div className="flex justify-end py-2 px-8 gap-x-2">
        <div className="flex items-center gap-x-2 mr-auto">
          <img src={WebsiteIcon.default} alt="" />
          <span className="text-3xl text-on-surface dark:text-on-surface-dark">
            IE Project
          </span>
        </div>
        <IconButtonC
          icon={<MdOutlineInfo size={24} />}
          onClick={() => setAboutModalState(true)}
        />
        <IconButtonC
          icon={<MdOutlineSettings size={24} />}
          onClick={() => navigate("/opt/account")}
        />
      </div>
      <div className="flex justify-between h-full py-2">
        <div className="flex flex-col flex-[0.2] gap-y-4 p-6">
          <ButtonC
            className="w-max"
            title="Upload"
            type="contained"
            icon={<MdOutlineFileUpload size={20} />}
            onCLick={() => setUploadModalState(true)}
          />
          {options.map((item) => (
            <Link to={item.link}>
              <MenuItemC
                label={item.label}
                icon={item.icon}
                selected={
                  item.link === ""
                    ? location.pathname.includes("folders") || item.link === ""
                    : location.pathname.split("/")[
                        location.pathname.split("/").length - 1
                      ] === item.link
                }
              />
            </Link>
          ))}
          <div className="mt-auto">
            <p className="border-on-surface-variant dark:border-on-surface-variant-dark">
              Storage
            </p>
            <div className="w-full h-3 p-[1px] rounded-[11px] border border-on-surface-variant dark:border-on-surface-variant-dark my-2">
              <div
                className={
                  "h-full px-1 rounded-[11px] bg-primary text-on-primary dark:text-on-primary-dark dark:bg-primary-dark text-right text-sm"
                }
                style={{ width: `${(storage.usage / storage.total) * 100}%` }}
              />
            </div>
            <div className="text-end">
              <span className="text-on-surface dark:text-on-surface-dark text-xs">
                ({storage.usage}GB / {storage.total}GB is Used)
              </span>
            </div>
          </div>
        </div>
        <div className="flex-[0.8]">
          <Outlet />
        </div>
      </div>
      <ModalC
        title="Upload File"
        open={uploadModalState}
        handleClose={() => setUploadModalState(false)}
      >
        <div className="flex flex-col gap-y-6">
          <Dropzone onDrop={(acceptedFiles) => handleUploadFile(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section className="h-[100px] text-on-surface-variant dark:bg-on-surface-variant-dark border border-outline dark:border-outline-dark rounded-sm cursor-pointer">
                <div
                  {...getRootProps()}
                  className="h-full flex flex-col justify-center items-center"
                >
                  <input {...getInputProps()} />
                  <MdOutlineFileUpload size={48} />
                  <p>Click or drag file</p>
                </div>
              </section>
            )}
          </Dropzone>
          <div className="flex justify-end gap-x-2">
            <ButtonC
              title="Cancel"
              type="outlined"
              onCLick={() => setUploadModalState(false)}
            />
            {/* <ButtonC title="Save" type="contained" onCLick={() => {}} /> */}
          </div>
        </div>
      </ModalC>
      <ModalC
        title="About app"
        open={aboutModalState}
        handleClose={() => setAboutModalState(false)}
      >
        <div className="flex flex-col gap-y-6">
          <span className="text-on-surface dark:text-on-surface-dark">
            This project was developed by:
          </span>
          <ThemeProvider theme={theme}>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#f8a432" }}>M</Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="text-on-surface dark:text-on-surface-dark"
                  primary="M. M. Hejazi"
                  secondary="Project Manager"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#f8a432" }}>A</Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="text-on-surface dark:text-on-surface-dark"
                  primary="A. Allahverdi"
                  secondary="Front-end Developer"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#f8a432" }}>N</Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="text-on-surface dark:text-on-surface-dark"
                  primary="N. Zamani"
                  secondary="Back-end Developer"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#f8a432" }}>M</Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="text-on-surface dark:text-on-surface-dark"
                  primary="M. Noravari"
                  secondary="UI Designer"
                />
              </ListItem>
            </List>
          </ThemeProvider>
          <div className="text-end">
            <ButtonC
              title="Open in github"
              type="contained"
              icon={<FaGithub size={20} />}
              onCLick={() => {}}
            />
          </div>
        </div>
      </ModalC>
    </div>
  );
};

export default Layout;
