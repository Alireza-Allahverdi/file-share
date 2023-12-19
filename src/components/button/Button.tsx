import { Button } from "@mui/material";

interface iProps {
  className?: string;
  title: string;
  icon?: JSX.Element;
  type: "contained" | "outlined";
  onCLick: () => void;
}

const ButtonC: React.FC<iProps> = ({
  className,
  title,
  icon,
  type,
  onCLick,
}) => {
  return (
    <Button
      className={`flex w-full items-center gap-x-2 ${className}`}
      variant={type}
      style={{
        backgroundColor : type === "contained" ? "#ED9B28": "",
        borderColor: "#ED9B28",
        borderRadius: "100px",
        boxShadow: "none",
        height: "40px",
        color: type === "outlined" ? "#ED9B28" : "",
    }}
      onClick={onCLick}
    >
      {title}
      {icon}
    </Button>
  );
};

export default ButtonC;
