import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";

import ConfirmationQuestion from "./components/ConfirmationQuestion";
import Container from "./components/Container";
import MetricLabel from "./components/MetricLabel";
import OptionsQuestionBody from "./components/OptionsQuestionBody";
import ScaleQuestionBody from "./components/ScaleQuestionBody";
import TextQuestionBody from "./components/TextQuestionBody";

import type { Item } from "../../types";

function renderQuestionByType({
  item,
  value,
  onAnswer,
}: {
  item: Item;
  value: number | string | null;
  onAnswer: (value: number | string | null) => void;
}) {
  switch (item.typeQuestion) {
    case "options":
      return (
        <OptionsQuestionBody
          typeMetric={item.typeMetric}
          options={item.options}
          value={typeof value === "string" ? Number(value) : value}
          onChange={(value: number | null) => onAnswer(value)}
        />
      );
    case "scale":
      return (
        <ScaleQuestionBody
          typeMetric={item.typeMetric}
          min={item.min}
          max={item.max}
          value={typeof value === "string" ? Number(value) : value}
          onChange={(value: number | null) => onAnswer(value)}
        />
      );
    case "text":
      return (
        <TextQuestionBody
          value={typeof value !== "string" ? (value ? value.toString() : "") : value}
          onChange={(value: string) => onAnswer(value)}
        />
      );
    default:
      return null;
  }
}

interface QuestionProps {
  item: Item;
  value: number | string | null;
  confirmationValue: number | null;
  onAnswer: (value: number | string | null) => void;
  onConfirm: (value: number) => void;
  onSubmit: () => void;
  isAnswered: () => boolean;
}

function Question({ item, value, confirmationValue, onAnswer, onConfirm, onSubmit, isAnswered }: QuestionProps) {
  const needsConfirmation = item.requiresConfirmation;

  return (
    <Container typeMetric={item.typeMetric}>
      <Box display="flex" justifyContent="flex-start" px={2}>
        <MetricLabel typeMetric={item.typeMetric} />
      </Box>

      <Box display="flex" justifyContent="flex-start" px={2}>
        <Typography variant="body2" fontWeight="bold">
          Respuestas enviadas hoy: {item.dailyAnswersCount}
        </Typography>
      </Box>

      {needsConfirmation && (
        <Box mb={2}>
          <ConfirmationQuestion
            typeMetric={item.typeMetric}
            title={item.confirmationQuestion}
            options={item.confirmationOptions}
            value={confirmationValue}
            onChange={(val) => onConfirm(val)}
          />
        </Box>
      )}

      {(!needsConfirmation || confirmationValue === 1) && (
        <Box display="flex" flexDirection="column" gap={1} px={4}>
          <Typography variant="h6" textAlign="center" fontWeight="bold">
            {item.question}
          </Typography>

          {renderQuestionByType({ item, value, onAnswer })}
        </Box>
      )}

      <Box display="flex" justifyContent="flex-end" my={2} px={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SendIcon />}
          onClick={() => {
            if (!isAnswered()) {
              alert("Por favor completa la pregunta antes de enviar.");
              return;
            }
            onSubmit();
          }}
          sx={{
            borderRadius: "4px",
          }}
        >
          <Typography variant="button" color="white" fontWeight="bold">
            Enviar respuesta
          </Typography>
        </Button>
      </Box>
    </Container>
  );
}

export default Question;
