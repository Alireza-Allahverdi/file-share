import { useEffect, useState } from "react";
import ButtonC from "../../../components/button/ButtonC";
import Input from "../../../components/input/Input";
import {
  MdLockOutline,
  MdOutlineContentCopy,
  MdOutlineSave,
} from "react-icons/md";
import { getCredentials } from "../../../actions/apiActions";
import { decrypt } from "../../../utils/functions";

function Security() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [secretKey, setSecretKey] = useState<string>("");

  useEffect(() => {
    getCredentials()
      .then((res) => {
        const sha256Pass = localStorage.getItem("shaPass");
        if (sha256Pass) {
          const decryptedKey = decrypt(res.data.key, sha256Pass, res.data.iv);
          setSecretKey(decryptedKey);
        }
      })
      .catch((err) => {
        // todo toast
      });
  }, []);

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
            <span className="w-1/5 text-on-surface dark:text-on-surface-dark">
              Password
            </span>
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
            title={!editMode ? "Change Password" : "Save"}
            type="contained"
            icon={
              !editMode ? (
                <MdLockOutline size={20} />
              ) : (
                <MdOutlineSave size={20} />
              )
            }
            onCLick={() => setEditMode(!editMode)}
          />
          {editMode ? (
            <ButtonC
              title="Cancel"
              type="outlined"
              onCLick={() => setEditMode(false)}
            />
          ) : null}
        </div>
        <div className="flex items-center gap-x-6">
          <div className="flex items-center gap-x-6 w-1/2">
            <span className="w-1/5 text-on-surface dark:text-on-surface-dark">
              Secret Key
            </span>
            <textarea
              className="w-4/5 border border-[#bdbdbd] p-3 text-on-surface dark:text-on-surface-dark rounded-md bg-transparent resize-none"
              value={secretKey}
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
              onCLick={() => {
                navigator.clipboard.writeText(secretKey)
                // todo toast
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Security;
