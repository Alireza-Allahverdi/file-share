import ButtonC from "../../../components/button/ButtonC";
import Input from "../../../components/input/Input";
import { MdLockOutline, MdOutlineContentCopy } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";

function Security() {
  return (
    <div>
      <div className="flex justify-between py-4 border-b border-b-on-surface dark:border-b-on-surface-dark">
        <span className="text-[22px] text-on-surface dark:bg-on-surface-dark">
          Security
        </span>
      </div>
      <div className="w-full flex flex-col gap-y-6 py-6">
        <div className="flex items-center gap-x-6">
          <span className="mr-2">Password</span>
          <Input
            className="w-[330px]"
            label="password"
            value={""}
            type="password"
            disabled
          />
          <ButtonC
            className="w-[220px] text-[14px]"
            title="Change Password"
            type="contained"
            icon={<MdLockOutline size={18} />}
          />
        </div>
        <div className="flex items-center gap-x-6">
          <span>Secret Key</span>
          <textarea
            className="w-[330px] border border-[#bdbdbd] rounded-md resize-none"
            rows={10}
            disabled
          ></textarea>
          <div className="h-[260px] flex items-end gap-x-4">
            <ButtonC
              className="w-[100px] text-[14px]"
              title="Copy"
              type="contained"
              icon={<MdOutlineContentCopy size={18} />}
            />
            <ButtonC
              className="w-[220px] text-[14px]"
              title="Change Secret Key"
              type="contained"
              icon={<GrUpdate size={15} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Security;
