import { ChangeEvent, useEffect, useState } from "react";
import Input from "../../../components/input/Input";
import { fetchAccount, updateAccount } from "../../../actions/apiActions";
import ButtonC from "../../../components/button/ButtonC";
import IconButtonC from "../../../components/iconButton/IconButtonC";
import {
  MdOutlineArrowBack,
  MdOutlineEdit,
  MdOutlineSave,
} from "react-icons/md";

export type ProfileResponse = {
  username: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  role: string;
};

function Account() {
  const [userInfo, setUserInfo] = useState<ProfileResponse>();
  const [editMode, setEditMode] = useState<boolean>(false);

  const fetchProfile = () => {
    fetchAccount().then((res) => {
      setUserInfo(res.data);
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (userInfo) {
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value,
      });
    }
  };

  const saveChanges = () => {
    if (userInfo) {
      updateAccount(userInfo)
      .then((res) => {
        console.log(res);
        
      })
    }      
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="h-full">
      <div className="flex justify-between py-4 border-b border-b-on-surface dark:border-b-on-surface-dark">
        <div className="flex items-center gap-x-3">
          {editMode && (
            <IconButtonC
              icon={<MdOutlineArrowBack size={24} />}
              onClick={() => setEditMode(false)}
            />
          )}
          <span className="text-[1.4em] text-on-surface dark:text-on-surface-dark">
            Account Info
          </span>
        </div>
        <ButtonC
          className="w-max"
          title={!editMode ? "Edit Info" : "Save Changes"}
          type="contained"
          icon={
            !editMode ? (
              <MdOutlineEdit size={20} />
            ) : (
              <MdOutlineSave size={20} />
            )
          }
          onCLick={() => {
            saveChanges()
            setEditMode(!editMode)
          }}
        />
      </div>
      <div className="w-full flex gap-x-[40px] py-6">
        <div className="flex flex-col w-full gap-y-6">
          <Input
            label="User Name"
            value={userInfo?.username}
            type="text"
            name="username"
            disabled={!editMode}
            onChange={handleChange}
          />
          <Input
            label="First Name"
            value={userInfo?.firstName}
            type="text"
            name="firstName"
            disabled={!editMode}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-full gap-y-6">
          <Input
            label="Email"
            value={userInfo?.emailAddress}
            type="email"
            name="emailAddress"
            disabled={!editMode}
            onChange={handleChange}
          />
          <Input
            label="Last Name"
            value={userInfo?.lastName}
            type="text"
            name="lastName"
            disabled={!editMode}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Account;
