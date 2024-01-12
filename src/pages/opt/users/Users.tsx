import ButtonC from "../../../components/button/ButtonC";
import { PiPlusBold } from "react-icons/pi";

function Users() {
  return (
    <div>
      <div className="flex items-center justify-between py-4 border-b border-b-on-surface dark:border-b-on-surface-dark">
        <span className="text-[22px] text-on-surface dark:bg-on-surface-dark">
          Users
        </span>
        <ButtonC
          className="w-max"
          title={"Add New User"}
          type="contained"
          icon={<PiPlusBold />}
          onCLick={() => {}}
        />
      </div>
    </div>
  );
}

export default Users;