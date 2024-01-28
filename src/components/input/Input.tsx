import { TextField, ThemeProvider, createTheme } from "@mui/material";

interface iProps {
  className?: string;
  type: string;
  label: string;
  name?: string
  value: string | number | undefined;
  errorText?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<iProps> = ({
  className,
  type,
  label,
  name,
  value,
  disabled,
  errorText,
  onChange,
}) => {
  const theme = createTheme({
    palette: {
      mode: localStorage.theme === "dark" ? "dark" : "light",
      primary: {
        main: "#835414",
      },
      secondary: {
        main: "#F9BB72",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <TextField
        className={className}
        error={!!errorText}
        type={type}
        name={name}
        label={!disabled ? label : ""}
        value={value}
        helperText={errorText}
        disabled={disabled}
        color={localStorage.theme === "dark" ? "secondary" : "primary"}
        onChange={onChange}
      />
    </ThemeProvider>
  );
};

export default Input;
