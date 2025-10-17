export type Item = {
  id: number;
  requiresConfirmation: boolean;
  options: Array<number>;
  min: number;
  max: number;
  typeQuestion: string;
  typeMetric: string;
  confirmationValue: number | null;
  dailyAnswersCount: number;
  confirmationQuestion: string;
  confirmationOptions: Array<number>;
  question: string;
};

type AnswerValue = number | string | null;
export type AnswersState = Record<number, AnswerValue>;
export type ConfirmationsState = Record<number, number>;
