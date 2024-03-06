import { TextField, debounce } from "@mui/material";
import { useState } from "react";
interface TextInputProps {
    onValueChange: (val: string) => void;
}
  

export default function TextInput({ onValueChange }: TextInputProps) {
    const [textInput, setTextInput] = useState<string>("");
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newTextInput = event.target.value;
      setTextInput(newTextInput);
      onValueChange(newTextInput);
    };
  
    return (
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={textInput}
        onChange={handleChange}
      />
    );
  }