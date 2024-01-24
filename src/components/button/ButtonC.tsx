import { Button, ThemeProvider, createTheme } from "@mui/material";

interface iProps {
  className?: string;
  title: string;
  icon?: JSX.Element;
  type: "contained" | "outlined";
  onCLick?: () => void;
}

const ButtonC: React.FC<iProps> = ({
  className,
  title,
  icon,
  type,
  onCLick,
}) => {

  const theme = createTheme({      
    typography: {
      button: {
        textTransform: 'none'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
    <Button
      className={`flex items-center gap-x-2 ${className}`}
      variant={type}
      style={{
        backgroundColor: localStorage.theme !== "dark" ? (type === "contained" ? "#835414" : "") : (type === "contained" ? "#FFC480" : ""),
        borderColor: localStorage.theme !== "dark" ? "#835414" : "#FFC480",
        borderRadius: "100px",
        boxShadow: "none",
        height: "40px",
        color: localStorage.theme !== "dark" ? (type === "outlined" ? "#835414" : "#fff") : (type === "outlined" ? "#FFC480" : "#472A00"),
      }}
      onClick={onCLick}
    >
      {icon}
      {title}
    </Button>
    </ThemeProvider>
  );
};

export default ButtonC;
