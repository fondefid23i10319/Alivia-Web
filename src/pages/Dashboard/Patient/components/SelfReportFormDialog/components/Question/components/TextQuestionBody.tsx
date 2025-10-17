import TextField from "@mui/material/TextField";

interface TextQuestionBodyProps {
  value: string;
  onChange: (value: string) => void;
}

function TextQuestionBody({ value = "", onChange = (_: string) => {} }: TextQuestionBodyProps) {
  return (
    <TextField
      fullWidth
      placeholder="Escribe tu respuesta..."
      multiline
      rows={5}
      variant="outlined"
      slotProps={{
        input: {
          style: {
            backgroundColor: "white",
          },
        },
      }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default TextQuestionBody;
