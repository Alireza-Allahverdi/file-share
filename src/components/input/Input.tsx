import { TextField } from "@mui/material";

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
  return (
    <TextField
      error={!!errorText}
      type={type}
      label={label}
      value={value}
      helperText={errorText}
      onChange={onChange}
    />
  );
};

export default Input;
