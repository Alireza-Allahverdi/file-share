import { TextField, ThemeProvider, colors, createTheme, outlinedInputClasses } from "@mui/material";

interface iProps {
  type: string;
  label: string;
  value: string | number;
  errorText?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<iProps> = ({
  type,
  label,
  value,
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
    // typography: {
    //   allVariants: {
    //     color: localStorage.theme === "dark" ? "#D8C3AF" : "",
    //     borderColor: localStorage.theme === "dark" ? "#A08E7B" : "",
    //   },
    // },
  });

  return (
    <ThemeProvider theme={theme}>
      <TextField
        error={!!errorText}
        type={type}
        label={label}
        value={value}
        helperText={errorText}
        color={localStorage.theme === "dark" ? "secondary" : "primary"}
        style={{color: "#fff", accentColor: "#fff", colorAdjust: "exact", colorScheme: "normal"}}
        onChange={onChange}
      />
    </ThemeProvider>
  );
};

export default Input;
