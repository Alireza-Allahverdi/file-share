import { IconButton } from "@mui/material";

interface iProps {
  icon: JSX.Element;
  onClick: () => void;
}

const IconButtonC: React.FC<iProps> = ({ icon, onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{color: localStorage.theme === "dark" ? "#D8C3AF" : "#534435"}}
    >
      {icon}
    </IconButton>
  );
};

export default IconButtonC;
