import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import {
  MdLockOutline,
  MdOutlineContentCopy,
  MdOutlineSave,
} from "react-icons/md";
import {
  changePassword,
  getCredentials,
  sendKey,
} from "../../../actions/apiActions";
import ButtonC from "../../../components/button/ButtonC";
import Input from "../../../components/input/Input";
import ModalC from "../../../components/modal/ModalC";
import { decrypt, encrypt } from "../../../utils/functions";

function Security() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [secretKey, setSecretKey] = useState<string>("");
  const [changePasswordModal, setChangePasswordModal] =
    useState<boolean>(false);

  const handleChangePassword = () => {
    const newPassHash256 = CryptoJS.SHA256(newPassword).toString(
      CryptoJS.enc.Hex
    );
    const newPassSha512 = CryptoJS.SHA512(newPassword)
      .toString(CryptoJS.enc.Hex)
      .toUpperCase();
    getCredentials()
      .then((res) => {
        const sha256Pass = localStorage.getItem("shaPass");
        if (sha256Pass) {
          changePassword(newPassSha512)
            .then(() => {
              const decryptedKey = decrypt(
                res.data.key,
                sha256Pass,
                res.data.iv
              );
              const encryptKey = encrypt(
                decryptedKey,
                newPassHash256,
                res.data.iv
              );
              sendKey(encryptKey).then(() => {
                localStorage.setItem("shaPass", newPassSha512);
                setChangePasswordModal(false);
                // todo toast new pass change success
              });
            })
            .catch((error) => {
              // todo toast error
            });
        }
      })
      .catch((err) => {
        // todo toast
      });
  };

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
      <ModalC
        title="Are you sure?"
        open={changePasswordModal}
        handleClose={() => setChangePasswordModal(false)}
      >
        <div className="flex flex-col gap-y-6">
          <div className="flex justify-end gap-x-2">
            <ButtonC
              title="Cancel"
              type="outlined"
              onCLick={() => setChangePasswordModal(false)}
            />
            <ButtonC
              title="Save"
              type="contained"
              onCLick={handleChangePassword}
            />
          </div>
        </div>
      </ModalC>

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
              value={newPassword}
              type="password"
              disabled={!editMode}
              onChange={(e) => setNewPassword(e.target.value)}
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
            onCLick={() => {
              if (editMode) {
                setChangePasswordModal(true);
              }
              setEditMode(!editMode);
            }}
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
                navigator.clipboard.writeText(secretKey);
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
