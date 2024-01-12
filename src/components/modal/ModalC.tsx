import { Modal } from "@mui/material";

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
      <div className="flex flex-col">
<div className="">

</div>
        {children}
        </div>
    </Modal>
  );
};

export default ModalC;
