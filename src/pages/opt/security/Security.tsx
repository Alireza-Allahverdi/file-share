import { useState } from "react";
import ButtonC from "../../../components/button/ButtonC";
import Input from "../../../components/input/Input";
import { MdLockOutline, MdOutlineContentCopy, MdOutlineSave } from "react-icons/md";

function Security() {

    const [editMode , setEditMode] = useState<boolean>(false)

  return (
    <div>
      <div className="flex justify-between py-4 border-b border-b-on-surface dark:border-b-on-surface-dark">
        <span className="text-[1.4em] text-on-surface dark:text-on-surface-dark">
          Security
        </span>
      </div>
      <div className="w-full flex flex-col gap-y-6 py-6">
        <div className="flex items-center gap-x-6">
          <div className="flex items-center gap-x-6 w-1/2">
          <span className="w-1/5 text-on-surface dark:text-on-surface-dark">Password</span>
          <Input
            className="w-4/5"
            label="password"
            value={""}
            type="password"
            disabled={!editMode}
          />
          </div>
            <ButtonC
              className="text-[14px]"
              title={!editMode  ?"Change Password" : "Save"}
              type="contained"
              icon={!editMode ? <MdLockOutline size={20} /> : <MdOutlineSave size={20} />}
              onCLick={() => setEditMode(!editMode)}
            />
            {
                editMode ?
                <ButtonC 
                title="Cancel"
                type="outlined"
                onCLick={() => setEditMode(false)}
                />
                : null
            }
        </div>
        <div className="flex items-center gap-x-6">
        <div className="flex items-center gap-x-6 w-1/2">
          <span className="w-1/5 text-on-surface dark:text-on-surface-dark">Secret Key</span>
          <textarea
            className="w-4/5 border border-[#bdbdbd] rounded-md bg-transparent resize-none"
            rows={10}
            disabled
          ></textarea>
        </div>
          <div className="h-[260px] flex items-end gap-x-4">
              <ButtonC
                className="text-[14px]"
                title="Copy"
                type="contained"
                icon={<MdOutlineContentCopy size={18} />}
              />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Security;
