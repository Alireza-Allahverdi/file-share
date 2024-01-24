import { Slider, ThemeProvider, createTheme } from "@mui/material";

interface sliderProps {
  value: number;
  min: number;
  max: number;
  handleChange: (event: number) => void
}

const SliderC: React.FC<sliderProps> = ({ value, max, min, handleChange }) => {
  const theme = createTheme({
    palette: {
      mode: localStorage.theme === "dark" ? "dark" : "light",
      primary: {
        main: "#835414",
      },
      secondary: {
        main: "#FFC480",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Slider
        value={value}
        step={1}
        marks
        min={min}
        max={max}
        sx={{width: 220}}
        color={localStorage.theme === "dark" ? "secondary" : "primary"}
        onChange={(e) => handleChange(e.target.value)}
      />
    </ThemeProvider>
  );
};

export default SliderC;
