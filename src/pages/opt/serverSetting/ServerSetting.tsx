import { useEffect, useState } from "react";
import ButtonC from "../../../components/button/ButtonC";
import Input from "../../../components/input/Input";
import { GiCheckedShield } from "react-icons/gi";
import { MdOutlineSave } from "react-icons/md";
import ModalC from "../../../components/modal/ModalC";
import {
  changeRegisteration,
  getRegisteration,
  getStorageUsage,
  getUserStorage,
  updateUserStorage,
} from "../../../actions/apiActions";

function ServerSetting() {
  const [storage, setStorage] = useState<{
    total: number;
    usage: number;
  }>();
  const [userStorage, setUserStorage] = useState<number>(0);
  const [registeration, setRegisteration] = useState<boolean>(false);
  const [capacityEditMode, setCapacityEditMode] = useState<boolean>(false);
  const [statusModal, setStatusModal] = useState<boolean>(false);

  const fetchStorageUsage = () => {
    getStorageUsage()
      .then((res) => {
        setStorage({
          total: (res.data.totalSpace / 1_000_000_000).toFixed(1),
          usage: (res.data.totalUsage / 1_000_000_000).toFixed(1),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUserStorage = () => {
    getUserStorage()
      .then((res) => {
        setUserStorage((res.data / 1_000_000_000).toFixed(1));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeUserStorage = () => {
    updateUserStorage(userStorage)
      .then((res) => {
        // TODO toast
      })
      .catch((err) => {
        // TODO toast
      });
  };

  const fetchRegisteration = () => {
    getRegisteration()
      .then((res) => {
        setRegisteration(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateRegisteration = () => {
changeRegisteration(!registeration)
.then((res) => {
  fetchRegisteration()
  setStatusModal(false)
// todo toast
})
.catch((err) => {
   // todo toast
})
  }

  useEffect(() => {
    fetchRegisteration();
    fetchStorageUsage();
    fetchUserStorage();
  }, []);

  return (
    <div>
      <ModalC
        title="Are you sure?"
        open={statusModal}
        handleClose={() => setStatusModal(false)}
      >
        <div className="flex flex-col gap-y-6">
          <span className="text-on-surface dark:text-on-surface-dark">
            Are you sure
          </span>
          <div className="flex justify-end gap-x-2">
            <ButtonC
              title="Cancel"
              type="outlined"
              onCLick={() => setStatusModal(false)}
            />
            <ButtonC title="Save" type="contained" onCLick={updateRegisteration} />
          </div>
        </div>
      </ModalC>
      <div className="flex justify-between py-4 border-b border-b-on-surface dark:border-b-on-surface-dark">
        <span className="text-[1.4em] text-on-surface dark:text-on-surface-dark">
          Server Settings
        </span>
      </div>
      <div className="flex flex-col gap-y-8 py-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-x-4 mb-2 text-md">
            <span className="w-[10%] text-on-surface dark:text-on-surface-dark">
              Storage Usage
            </span>
            <div className="w-[80%] p-[1px] h-6 rounded-[11px] border border-on-surface-variant dark:border-on-surface-variant-dark ml-auto">
              <div
                className={`min-w-[35px] h-full px-1 rounded-[11px] bg-primary text-on-primary dark:text-on-primary-dark dark:bg-primary-dark text-right text-sm`}
                style={{
                  width: storage && (storage?.usage / storage?.total) * 100,
                }}
              >
                {storage && (storage?.usage / storage?.total) * 100}%
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="w-1/2 text-xs text-on-surface dark:text-on-surface-dark">
              This bar displays the total space usage and available on your host
              in which can be used to manage files by users.
            </span>
            <span className="text-on-surface dark:text-on-surface-dark text-xs">
              ({storage?.usage}GB / {storage?.total}GB is Used)
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-x-4 mb-2 text-md">
            <div className="flex items-center gap-x-4 w-1/3 mr-6">
              <span className="w-2/6 text-on-surface dark:text-on-surface-dark">
                User Storage
              </span>
              <Input
                className="w-4/6"
                label="User Storage"
                type="text"
                value={!capacityEditMode ? `${!!userStorage ? userStorage :0} GB` : !!userStorage ? userStorage :0}
                disabled={!capacityEditMode}
                onChange={(e) => setUserStorage(parseInt(e.target.value))}
              />
            </div>
            <ButtonC
              title={!capacityEditMode ? "Update" : "Save"}
              type="contained"
              icon={
                !capacityEditMode ? (
                  <GiCheckedShield size={18} />
                ) : (
                  <MdOutlineSave size={20} />
                )
              }
              onCLick={() => {
                if (capacityEditMode) {
                  changeUserStorage()
                }
                setCapacityEditMode(!capacityEditMode)
              }}
            />
            {capacityEditMode ? (
              <ButtonC
                title="Cancel"
                type="outlined"
                onCLick={() => setCapacityEditMode(false)}
              />
            ) : null}
          </div>
          <div className="flex justify-between">
            <span className="w-1/2 text-xs text-on-surface dark:text-on-surface-dark">
              Shows the maximum space usable by each user in this host.
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-x-4 mb-2 text-md">
            <div className="flex gap-x-4 w-1/3 mr-6">
              <span className="w-2/6 text-on-surface dark:text-on-surface-dark">
                Registration
              </span>
              <span className="w-4/6 text-on-surface-variant dark:text-on-surface-variant-dark">
                {registeration ? "Open to everyone" : "Admin only"}
              </span>
            </div>
            <ButtonC
              title="Change Status"
              type="contained"
              icon={<GiCheckedShield size={18} />}
              onCLick={() => setStatusModal(true)}
            />
          </div>
          <div className="flex justify-between">
            <span className="w-1/2 text-xs text-on-surface dark:text-on-surface-dark">
              This option will allow or disallow public registration by guests
              in you host.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServerSetting;
