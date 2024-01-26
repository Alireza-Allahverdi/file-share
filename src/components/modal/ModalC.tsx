import { Modal } from "@mui/material";
import IconButtonC from "../iconButton/IconButtonC";
import { RxCross2 } from "react-icons/rx";

interface modalProps {
  open: boolean;
  title: string;
  children: JSX.Element;
  handleClose: () => void;
}

const ModalC: React.FC<modalProps> = ({
  open,
  title,
  handleClose,
  children,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="absolute p-6 flex flex-col w-[400px] bg-surface-container-high dark:bg-surface-container-high-dark rounded-[28px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center mb-6">
          <span className="text-[1.5em] text-on-surface dark:text-on-surface-dark">
            {title}
          </span>
          <IconButtonC icon={<RxCross2 />} onClick={handleClose} />
        </div>
        {children}
      </div>
    </Modal>
  );
};

export default ModalC;
