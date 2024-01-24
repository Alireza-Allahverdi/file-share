import { useState } from "react";
import ButtonC from "../../../components/button/ButtonC";
import IconButtonC from "../../../components/iconButton/IconButtonC";
import {
  MdOutlineArrowBack,
  MdOutlineEdit,
  MdOutlineSave,
} from "react-icons/md";
import Input from "../../../components/input/Input";

function Account() {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState<boolean>(false);

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
          <span className="text-[1.4em] text-on-surface dark:text-on-surface-dark">Account Info</span>
        </div>
        <ButtonC
          className="w-max"
          title={!editMode ? "Edit Info" : "Save Changes"}
          type="contained"
          icon={!editMode ? <MdOutlineEdit size={20} /> : <MdOutlineSave size={20} />}
          onCLick={() => setEditMode(!editMode)}
        />
      </div>
      <div className="w-full flex gap-x-[40px] py-6">
        <div className="flex flex-col w-full gap-y-6">
          <Input
            label="User Name"
            value={""}
            type="text"
            disabled={!editMode}
            onChange={(e) => console.log(e)}
          />
          <Input
            label="First Name"
            value={""}
            type="text"
            disabled={!editMode}
            onChange={(e) => console.log(e)}
          />
        </div>
        <div className="flex flex-col w-full gap-y-6">
          <Input
            label="Email"
            value={""}
            type="email"
            disabled={!editMode}
            onChange={(e) => console.log(e)}
          />
          <Input
            label="Last Name"
            value={""}
            type="text"
            disabled={!editMode}
            onChange={(e) => console.log(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default Account;
