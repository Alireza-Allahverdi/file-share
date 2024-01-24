import ButtonC from "../../components/button/ButtonC";
import { PiPlusBold } from "react-icons/pi";

const Home = () => {
  return (
    <div>
      <div className="flex justify-between py-4 border-b border-b-on-surface dark:border-b-on-surface-dark">
        <span className="text-[1.4em] text-on-surface dark:text-on-surface-dark">
          Home
        </span>
        <ButtonC title="New Folder" type="outlined" icon={<PiPlusBold size={18} />} />
      </div>
    </div>
  );
};

export default Home;
